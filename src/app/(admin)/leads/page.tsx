"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Eye,
  Mail,
  Phone,
  RefreshCw,
  Trash2,
  X,
} from "lucide-react";
import StatusSelect, {
  STATUSES,
  statusMeta,
  type LeadStatus,
} from "./StatusSelect";

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  purpose?: string;
  propertyType?: string;
  size?: string;
  budget?: string;
  message?: string;
  source?: string;
  origin?: { kind: "property" | "page"; name: string };
  status?: LeadStatus;
  verified?: boolean;
  createdAt: string;
}

const statusOf = (lead: Lead) => statusMeta(lead.status);

const PAGE_SIZES = [10, 25, 50, 100];
const ALL = "";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]";
const iconButton = `inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-700 text-gray-300 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 ${focusRing}`;
const filterSelect = `h-10 rounded-lg border border-gray-700 bg-[#0b121a] px-3 text-sm text-gray-200 cursor-pointer ${focusRing}`;

/** Email/phone pill: the left part opens mail/dialer, the right part copies. */
function ContactChip({
  href,
  icon,
  value,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  return (
    <div className="inline-flex items-stretch overflow-hidden rounded-lg border border-gray-700 text-sm text-gray-200">
      <a
        href={href}
        className={`inline-flex items-center gap-2 px-3 py-2 transition-colors hover:bg-white/5 hover:text-white ${focusRing}`}
      >
        {icon} {value}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? `Copied ${label}` : `Copy ${label}`}
        title={copied ? "Copied" : `Copy ${label}`}
        className={`inline-flex w-9 items-center justify-center border-l border-gray-700 transition-colors cursor-pointer hover:bg-white/5 ${
          copied ? "text-emerald-400" : "text-gray-400 hover:text-white"
        } ${focusRing}`}
      >
        {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? `${label} copied` : ""}
      </span>
    </div>
  );
}

export default function LeadsAdmin() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [statusFilter, setStatusFilter] = useState(ALL);
  const [purposeFilter, setPurposeFilter] = useState(ALL);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [page, setPage] = useState(1);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const confirmRef = useRef<HTMLDialogElement>(null);
  const [pendingDelete, setPendingDelete] = useState<Lead | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const [refreshing, setRefreshing] = useState(false);

  const fetchLeads = async () => {
    setRefreshing(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/lead/all`
      );
      setLeads(res.data);
    } catch (error) {
      console.error("Failed to fetch leads", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const purposes = useMemo(
    () =>
      [...new Set(leads.map((l) => l.purpose).filter(Boolean))] as string[],
    [leads]
  );

  const filtered = useMemo(
    () =>
      leads.filter(
        (l) =>
          (statusFilter === ALL || statusOf(l).value === statusFilter) &&
          (purposeFilter === ALL || l.purpose === purposeFilter)
      ),
    [leads, statusFilter, purposeFilter]
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pageStart = (currentPage - 1) * pageSize;
  const pageLeads = filtered.slice(pageStart, pageStart + pageSize);

  const countByStatus = (status: LeadStatus) =>
    leads.filter((l) => statusOf(l).value === status).length;

  const openLead = (lead: Lead) => {
    setSelected(lead);
    dialogRef.current?.showModal();
  };

  const closeLead = () => dialogRef.current?.close();

  const handleStatusChange = async (lead: Lead, status: LeadStatus) => {
    const previous = lead.status;
    const apply = (s: LeadStatus | undefined) => {
      setLeads((prev) =>
        prev.map((l) => (l._id === lead._id ? { ...l, status: s } : l))
      );
      setSelected((sel) => (sel?._id === lead._id ? { ...sel, status: s } : sel));
    };

    apply(status); // optimistic
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/lead/${lead._id}/status`,
        { status }
      );
    } catch (error) {
      console.error("Status update failed", error);
      apply(previous);
      alert("Couldn't update the status. Try again.");
    }
  };

  const askDelete = (lead: Lead) => {
    setDeleteError("");
    setPendingDelete(lead);
    confirmRef.current?.showModal();
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    const _id = pendingDelete._id;
    setDeleting(true);
    setDeleteError("");
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE}/api/lead/${_id}`);
      setLeads((prev) => prev.filter((l) => l._id !== _id));
      confirmRef.current?.close();
      if (selected?._id === _id) closeLead();
    } catch (error) {
      console.error("Delete failed", error);
      setDeleteError("Couldn't delete this lead. Try again.");
    } finally {
      setDeleting(false);
    }
  };

  const filtersActive = statusFilter !== ALL || purposeFilter !== ALL;

  return (
    <div className="p-2 sm:p-6">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Leads</h1>
          <p className="mt-1 text-sm text-gray-400">
            Enquiries from the contact page, property pages and listings.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {!loading && (
            <span className="rounded-full border border-gray-700 px-3 py-1 text-sm text-gray-300">
              {leads.length} total
            </span>
          )}
          <button
            type="button"
            onClick={fetchLeads}
            disabled={refreshing}
            className={`inline-flex h-9 items-center gap-2 rounded-lg border border-gray-700 px-3 text-sm text-gray-300 transition-colors cursor-pointer enabled:hover:border-[var(--primary)] enabled:hover:text-white disabled:cursor-wait disabled:opacity-60 ${focusRing}`}
          >
            <RefreshCw
              aria-hidden
              size={14}
              className={refreshing ? "animate-spin" : undefined}
            />
            {refreshing ? "Refreshing…" : "Refresh"}
          </button>
        </div>
      </div>

      {/* Status chips double as a quick filter and a pipeline summary */}
      <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Filter by status">
        <button
          type="button"
          onClick={() => {
            setStatusFilter(ALL);
            setPage(1);
          }}
          aria-pressed={statusFilter === ALL}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors ${focusRing} ${
            statusFilter === ALL
              ? "border-white/60 bg-white/10 text-white"
              : "border-gray-700 text-gray-400 hover:text-white"
          }`}
        >
          All · {leads.length}
        </button>
        {STATUSES.map((s) => (
          <button
            key={s.value}
            type="button"
            onClick={() => {
              setStatusFilter(statusFilter === s.value ? ALL : s.value);
              setPage(1);
            }}
            aria-pressed={statusFilter === s.value}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors ${focusRing} ${
              statusFilter === s.value
                ? s.className
                : "border-gray-700 text-gray-400 hover:text-white"
            }`}
          >
            {s.label} · {countByStatus(s.value)}
          </button>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <label className="sr-only" htmlFor="purpose-filter">
          Purpose
        </label>
        <select
          id="purpose-filter"
          value={purposeFilter}
          onChange={(e) => {
            setPurposeFilter(e.target.value);
            setPage(1);
          }}
          className={filterSelect}
        >
          <option value={ALL}>All purposes</option>
          {purposes.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        {filtersActive && (
          <button
            type="button"
            onClick={() => {
              setStatusFilter(ALL);
              setPurposeFilter(ALL);
              setPage(1);
            }}
            className={`text-sm text-gray-400 underline-offset-4 hover:text-white hover:underline cursor-pointer ${focusRing}`}
          >
            Clear filters
          </button>
        )}

        <div className="ml-auto flex items-center gap-2 text-sm text-gray-400">
          <label htmlFor="page-size">Rows per page</label>
          <select
            id="page-size"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className={filterSelect}
          >
            {PAGE_SIZES.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-800 bg-[#0b121a]">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-gray-800 text-xs uppercase tracking-wider text-gray-400">
            <tr>
              <th className="px-4 py-3 font-medium">Lead</th>
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">Purpose</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Received</th>
              <th className="px-4 py-3 text-right font-medium">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-4 py-4">
                    <div className="h-4 w-32 rounded bg-gray-800" />
                    <div className="mt-2 h-3 w-44 rounded bg-gray-800" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-4 w-28 rounded bg-gray-800" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-5 w-24 rounded-full bg-gray-800" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-8 w-24 rounded-full bg-gray-800" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-4 w-32 rounded bg-gray-800" />
                  </td>
                  <td className="px-4 py-4" />
                </tr>
              ))
            ) : pageLeads.length > 0 ? (
              pageLeads.map((lead) => (
                <tr
                  key={lead._id}
                  className="transition-colors hover:bg-white/[0.03]"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{lead.name}</p>
                    <p className="text-gray-400">{lead.email}</p>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {lead.phone ? (
                      <a
                        href={`tel:${lead.phone}`}
                        className="text-gray-200 hover:text-[var(--primary)] hover:underline"
                      >
                        {lead.phone}
                      </a>
                    ) : (
                      <span className="text-gray-600">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {lead.purpose ? (
                      <span className="inline-block whitespace-nowrap rounded-full border border-gray-700 bg-white/5 px-2.5 py-0.5 text-xs text-gray-200">
                        {lead.purpose}
                      </span>
                    ) : (
                      <span className="text-gray-600">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <StatusSelect
                      value={lead.status}
                      label={`Status for ${lead.name}`}
                      onChange={(s) => handleStatusChange(lead, s)}
                    />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-400">
                    {formatDate(lead.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openLead(lead)}
                        aria-label={`View lead from ${lead.name}`}
                        className={`${iconButton} hover:border-[var(--primary)] hover:text-white`}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => askDelete(lead)}
                        aria-label={`Delete lead from ${lead.name}`}
                        className={`${iconButton} hover:border-red-500 hover:bg-red-500/10 hover:text-red-400`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-gray-500">
                  {filtersActive
                    ? "No leads match these filters."
                    : "No leads yet. New enquiries will show up here."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {!loading && filtered.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-gray-400">
          <p>
            Showing {pageStart + 1}–{pageStart + pageLeads.length} of{" "}
            {filtered.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className={`${iconButton} enabled:hover:text-white`}
            >
              <ChevronLeft size={16} />
            </button>
            <span className="min-w-20 text-center">
              Page {currentPage} of {pageCount}
            </span>
            <button
              type="button"
              onClick={() => setPage(currentPage + 1)}
              disabled={currentPage === pageCount}
              aria-label="Next page"
              className={`${iconButton} enabled:hover:text-white`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Native dialog: focus trap, Escape to close and backdrop come built in. */}
      <dialog
        ref={dialogRef}
        onClose={() => setSelected(null)}
        onClick={(e) => e.target === dialogRef.current && closeLead()}
        aria-labelledby="lead-dialog-title"
        className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-xl border border-gray-800 bg-[#0b121a] p-0 text-white backdrop:bg-black/70"
      >
        {selected && (
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="lead-dialog-title" className="text-xl font-semibold">
                  {selected.name}
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  {formatDate(selected.createdAt)}
                </p>
              </div>
              <button
                type="button"
                onClick={closeLead}
                aria-label="Close"
                className={`${iconButton} hover:text-white`}
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <ContactChip
                href={`mailto:${selected.email}`}
                icon={<Mail size={14} aria-hidden />}
                value={selected.email}
                label="email"
              />
              {selected.phone && (
                <ContactChip
                  href={`tel:${selected.phone}`}
                  icon={<Phone size={14} aria-hidden />}
                  value={selected.phone}
                  label="phone number"
                />
              )}
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-wider text-gray-500">
                  Purpose
                </dt>
                <dd className="mt-1 text-gray-200">{selected.purpose || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-gray-500">
                  Property type
                </dt>
                <dd className="mt-1 text-gray-200">
                  {selected.propertyType || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-gray-500">
                  Size
                </dt>
                <dd className="mt-1 text-gray-200">{selected.size || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-gray-500">
                  Budget
                </dt>
                <dd className="mt-1 text-gray-200">{selected.budget || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-gray-500">
                  Source
                </dt>
                <dd className="mt-1 capitalize text-gray-200">
                  {selected.source || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-gray-500">
                  Came from
                </dt>
                <dd className="mt-1 text-gray-200">
                  {selected.origin ? (
                    <>
                      <span className="inline-block rounded border border-gray-700 px-1.5 py-0.5 text-xs uppercase text-gray-400">
                        {selected.origin.kind}
                      </span>
                      <span className="mt-1.5 block">{selected.origin.name}</span>
                    </>
                  ) : (
                    "—"
                  )}
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-xs uppercase tracking-wider text-gray-500">
                  Status
                </dt>
                <dd className="mt-1">
                  <StatusSelect
                    value={selected.status}
                    label={`Status for ${selected.name}`}
                    onChange={(s) => handleStatusChange(selected, s)}
                  />
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-wider text-gray-500">
                Message
              </p>
              <p className="mt-2 max-h-60 overflow-y-auto whitespace-pre-wrap rounded-lg border border-gray-800 bg-black/40 p-4 text-sm leading-relaxed text-gray-200">
                {selected.message || "No message."}
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => askDelete(selected)}
                className={`inline-flex items-center gap-2 rounded-lg border border-red-500/40 px-4 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/10 cursor-pointer ${focusRing}`}
              >
                <Trash2 size={14} aria-hidden /> Delete lead
              </button>
            </div>
          </div>
        )}
      </dialog>

      {/* Delete confirmation; stacks above the view dialog when opened from it */}
      <dialog
        ref={confirmRef}
        onClose={() => setPendingDelete(null)}
        onCancel={(e) => deleting && e.preventDefault()}
        onClick={(e) =>
          e.target === confirmRef.current && !deleting && confirmRef.current?.close()
        }
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-desc"
        className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-xl border border-gray-800 bg-[#0b121a] p-0 text-white backdrop:bg-black/70"
      >
        {pendingDelete && (
          <div className="p-6">
            <span
              aria-hidden
              className="flex h-11 w-11 items-center justify-center rounded-full border border-red-500/40 bg-red-500/10 text-red-400"
            >
              <Trash2 size={18} />
            </span>
            <h2 id="delete-dialog-title" className="mt-4 text-lg font-semibold">
              Delete this lead?
            </h2>
            <p id="delete-dialog-desc" className="mt-2 text-sm leading-relaxed text-gray-400">
              The enquiry from{" "}
              <span className="text-gray-200">{pendingDelete.name}</span> (
              {pendingDelete.email}) will be permanently removed. This can&apos;t
              be undone.
            </p>

            {deleteError && (
              <p
                role="alert"
                className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300"
              >
                {deleteError}
              </p>
            )}

            <div className="mt-6 flex justify-end gap-3">
              {/* First in DOM so it gets initial focus: Enter won't delete by accident */}
              <button
                type="button"
                autoFocus
                onClick={() => confirmRef.current?.close()}
                disabled={deleting}
                className={`h-10 rounded-lg border border-gray-700 px-4 text-sm text-gray-200 transition-colors cursor-pointer hover:bg-white/5 disabled:opacity-50 ${focusRing}`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={deleting}
                className={`inline-flex h-10 items-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition-colors cursor-pointer hover:bg-red-500 disabled:cursor-wait disabled:opacity-60 ${focusRing}`}
              >
                <Trash2 size={14} aria-hidden />
                {deleting ? "Deleting…" : "Delete lead"}
              </button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
