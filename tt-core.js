// tt-core.js - 教师工具站核心 SDK
window.TT_SDK = (function() {
    const config = window.SITE_CONFIG;

    // 1. 生成设备指纹 (16位唯一码)
    async function getFingerprint() {
        const data = [
            navigator.userAgent,
            screen.width + 'x' + screen.height,
            navigator.language
        ].join('|');
        const msgUint8 = new TextEncoder().encode(data);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 16);
    }

    // 2. 会员管理器 (支持设备绑定)
    class PM {
        constructor() {
            this.license = JSON.parse(localStorage.getItem(config.STORAGE.LICENSE) || "null");
            this.isPro = this._check();
        }

        _check() {
            if (!this.license) return false;
            if (this.license.e && Date.now() > this.license.e) {
                localStorage.removeItem(config.STORAGE.LICENSE);
                return false;
            }
            return true;
        }

        async activate(key) {
            try {
                if (!key.startsWith('TEACHERPRO-')) throw new Error('格式错误');
                const p = JSON.parse(atob(key.replace('TEACHERPRO-', '')));
                
                // 验证签名
                const signData = JSON.stringify({ t: p.t, i: p.i, e: p.e, d: p.d });
                const expectedSig = await this._hmac(signData);
                if (expectedSig !== p.s) throw new Error('签名无效');

                // 验证设备绑定
                const finger = await getFingerprint();
                if (p.d && p.d !== "") {
                    const allowedDevices = p.d.split(',');
                    if (!allowedDevices.includes(finger)) {
                        throw new Error(`设备不匹配 (当前ID: ${finger})`);
                    }
                }

                this.license = { ...p, activatedAt: Date.now(), device: finger };
                localStorage.setItem(config.STORAGE.LICENSE, JSON.stringify(this.license));
                this.isPro = true;
                return { ok: true, msg: '激活成功！' };
            } catch (e) {
                return { ok: false, msg: e.message };
            }
        }

        async _hmac(t) {
            const enc = new TextEncoder();
            const k = await crypto.subtle.importKey('raw', enc.encode(config.SECRET_KEY), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
            const s = await crypto.subtle.sign('HMAC', k, enc.encode(t));
            return Array.from(new Uint8Array(s)).map(b => b.toString(16).padStart(2, '0')).join('');
        }
    }

    // 3. 分享海报生成 (Canvas 增强)
    async function makePoster(canvasElement, title = "作品分享") {
        const p = document.createElement('canvas');
        const c = p.getContext('2d');
        p.width = 600; p.height = 850;
        
        c.fillStyle = '#ffffff';
        c.fillRect(0, 0, 600, 850);
        
        // 绘制主图 (保持比例)
        const ratio = canvasElement.height / canvasElement.width;
        c.drawImage(canvasElement, 50, 80, 500, 500 * ratio);
        
        // 底部文字
        c.fillStyle = '#1e293b';
        c.font = 'bold 28px sans-serif';
        c.fillText(title, 50, 720);
        
        c.fillStyle = '#64748b';
        c.font = '20px sans-serif';
        c.fillText(`由 ${config.SITE_NAME} 提供技术支持`, 50, 760);
        
        return p.toDataURL('image/png');
    }

    // 4. 数据持久化助手
    const Store = {
        save: (key, val) => localStorage.setItem(`tt_v2_${key}`, JSON.stringify(val)),
        get: (key) => JSON.parse(localStorage.getItem(`tt_v2_${key}`) || "null")
    };

    return { premium: new PM(), getFingerprint, makePoster, Store };
})();