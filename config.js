/* 
 * 教师工具站 - 全局配置文件
 * 注意：修改此文件后，刷新网页即可生效。
 */
const SITE_CONFIG = {
    // 🔑 发卡密钥 (请修改为您自己的复杂密码)
    // 注意：主页、工具页、生成器会自动读取这里，保持同步。
    SECRET_KEY: "ChangeThisToYourOwnSuperSecretKey_2026!", 
    
    // 📦 本地存储键名 (统一管理，防止冲突)
    STORAGE: {
        LICENSE: "teacher_pro_license", // 会员数据
        USAGE: "cloudTextUsage",        // 云朵字每日限额数据
        ADMIN_AUTH: "admin_auth_session" // 后台管理登录态
    },

    // 🏷️ 其他配置
    SITE_NAME: "教师工具站",
    VERSION: "1.0.0"
};