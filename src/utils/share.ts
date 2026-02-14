/**
 * Share utilities for production-safe sharing
 * Works in both development and production (Vercel)
 */

/**
 * Get the base URL for the application
 * Works in both dev and production
 */
export const getBaseUrl = (): string => {
    if (typeof window !== 'undefined') {
        return window.location.origin;
    }
    return '';
};

/**
 * Share content using Web Share API with fallbacks
 */
export const shareContent = async (title: string, text: string, url: string): Promise<{ success: boolean; method: string }> => {
    // Try native Web Share API first (mobile)
    if (navigator.share) {
        try {
            await navigator.share({ title, text, url });
            return { success: true, method: 'native' };
        } catch (err) {
            // User cancelled or error - fall through to clipboard
        }
    }

    // Fallback to clipboard
    try {
        await navigator.clipboard.writeText(url);
        return { success: true, method: 'clipboard' };
    } catch (err) {
        return { success: false, method: 'none' };
    }
};

/**
 * Share to WhatsApp
 */
export const shareToWhatsApp = (text: string, url: string): void => {
    const whatsappText = encodeURIComponent(`${text}\n\n${url}`);
    const whatsappUrl = `https://wa.me/?text=${whatsappText}`;
    window.open(whatsappUrl, '_blank');
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy:', err);
        return false;
    }
};
