import {FormattedEntry, GuestBookEntry} from "./types";

export function mapEntriesWithFormattedDate(
  entries: GuestBookEntry[],
  locale = "nl-BE"
): FormattedEntry[] {
  return entries.map((entry) => ({
    ...entry,
    formattedDate: entry.date.toLocaleString(locale, {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));
}
