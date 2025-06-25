export function formatDate(dateString: string): string {
    if (!dateString) return "";

    const postDate = new Date(dateString);
    const now = new Date();

    const diffMs = now.getTime() - postDate.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return "только что";
    if (diffMinutes < 60) return `${diffMinutes} мин назад`;
    if (diffHours < 24) return `${diffHours} час${diffHours === 1 ? '' : 'а'} назад`;
    if (diffDays < 7) return `${diffDays} д${diffDays === 1 ? 'ень' : 'ней'} назад`;

    const day = String(postDate.getDate()).padStart(2, '0');
    const month = String(postDate.getMonth() + 1).padStart(2, '0');
    const year = postDate.getFullYear();

    return `${day}.${month}.${year}`;
}


export function getFormattedDate(): string {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear()).slice(-2);
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}