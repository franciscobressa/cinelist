export function formatDate(dateIso?: string | null): string {
    if (!dateIso) return "N/A";
    const parts = dateIso.split("-");
    if (parts.length !== 3) return "N/A";

    const [yearStr, monthStr, dayStr] = parts;
    const year = Number(yearStr);
    const month = Number(monthStr);
    const day = Number(dayStr);

    if ([year, month, day].some((value) => Number.isNaN(value))) {
        return "N/A";
    }

    const date = new Date(Date.UTC(year, month - 1, day));

    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "UTC",
    }).format(date);
}


