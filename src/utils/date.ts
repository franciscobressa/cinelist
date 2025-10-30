export function formatDate(dateIso?: string): string {
    if (!dateIso) return "";
    const date = new Date(dateIso);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(date);
}


