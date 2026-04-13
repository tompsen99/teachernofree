const SITE_CONFIG = {
  // 🔑 密钥列表：第一个为当前用于生成的【主密钥】，其余为【历史密钥】，系统将自动尝试匹配所有密钥以保证旧卡密有效
  SECRET_KEYS: [
    "ChangeThisToYourOwnSuperSecretKey_2026!",
    "OldKey_Backup_2025" 
  ],
  // 💰 支付与发卡配置
  PAYMENT: {
    EMAIL: "your-email@example.com",      // 您的联系邮箱
    FAKA_URL: "https://your-faka-store.com", // 自动化发卡平台链接（实现“自动发送卡密”的最佳方案）
    WECHAT_QR: "path/to/your/wechat-pay.jpg", // 微信收款码路径
    ALIPAY_QR: "path/to/your/alipay-pay.jpg"  // 支付宝收款码路径
  },
  STORAGE: {
    LICENSE: "teacher_pro_license",
    USAGE: "cloudTextUsage",
    ADMIN_AUTH: "admin_auth_session"
  },
  SITE_NAME: "教师工具站",
  VERSION: "1.1.0"
};