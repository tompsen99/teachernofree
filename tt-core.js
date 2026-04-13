window.TT_SDK = (function() {
    const config = window.SITE_CONFIG;
    async function getFingerprint() {
        const data = [navigator.userAgent, screen.width + 'x' + screen.height, navigator.language].join('|');
        const msgUint8 = new TextEncoder().encode(data);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
        return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 16);
    }
    async function makePoster(mainCanvas, title) {
        const p = document.createElement('canvas'); const c = p.getContext('2d');
        p.width = 800; p.height = 1100; c.fillStyle = '#ffffff'; c.fillRect(0,0,800,1100);
        const scale = 700 / mainCanvas.width;
        c.drawImage(mainCanvas, 50, 100, 700, mainCanvas.height * scale);
        c.fillStyle = '#1e293b'; c.font = 'bold 32px sans-serif'; c.fillText(title, 50, 950);
        c.fillStyle = '#64748b'; c.font = '22px sans-serif'; c.fillText(`来自：${config.SITE_NAME}`, 50, 1000);
        return p.toDataURL('image/png');
    }
    return { getFingerprint, makePoster };
})();