/**
 * Attention Please : Use the same range of code for your section or module
 */
const MESSAGES = {

    // General errors
    1001: 'Not logged in',
    1002: 'Not valid token',
    1003: 'Login Identifier not found',
    1004: 'Login Invalid password',

    // Register And User errors
    1020: 'email should be string',
    1021: 'email is required',
    1022: 'email already exists',

    1023: 'username should be string',
    1024: 'username is required',
    1025: 'username already exists',

    1026: 'firstname should be string',
    1027: 'lastname should be string',

    1028: 'password should be string',
    1029: 'password is required',

    1030: 'mobile should be string',
    1031: 'avatar should be string',
    1032: 'فیلد مرتب سازی صحیح نمی باشد',

    // Chat Error Code range
    2000: 'برای به روزرسانی می بایست id آیتم مورد نظر را ارائه دهید',
    2001: 'برای به روزرسانی می بایست id برد مورد نظر را ارائه دهید',
    2002: 'آیتم مورد نظر برای ویرایش پیدا نشد',

    2003: 'برای ذخیره تاریخچه نیاز به ارسال Item یا Board مربوطه می باشد',
    2004: 'برای ذخیره دیتای meta نیاز به ارسال Item یا Board مربوطه می باشد',
    2005: 'ذخیره آیتم بدون برد معتبر امکان پذیر نمی باشد',
    2006: 'شناسه برد ارائه شده معتبر نمی باشد',
    2007: 'شناسه آیتم ارائه شده معتبر نمی باشد',
    2008: 'برای ذخیره سازی پیوست نیاز به شناسه آیتم می باشد',
    2009: 'برای دریافت اطلاعات برنامه می بایست شناسه آن ارسال شود',
    2010: 'برای دریافت اطلاعات کاربر می بایست شناسه ای از او ارسال شود',
    2011: 'برای حذف تگ متا می بایست شناسه ای از آن ارسال شود',

    // App control
    3000: 'شما به این برنامه دسترسی ندارید',
    3001: 'برای دسترسی به برنامه می بایست شناسه آن را ارسال کنید'
};


const hasString = (string, subStr) => string.indexOf(subStr) > -1;
const checkORMErrors = message => {
    if (hasString(message, 'Would violate uniqueness constraint')){
        return 'این رکورد قبلا درج شده است.';
    } else if (hasString(message, 'Missing value for required attribute')){
        let fieldName = message.substr(message.indexOf('`') +1, 15);
        fieldName = fieldName.substr(0, fieldName.indexOf('`'));
        return `مقداردهی ${fieldName} اجباری می باشد`;
    } else if (hasString(message, 'wrong type of data for property')){
        let fieldName = message.substr(message.indexOf('`') +1, 15);
        fieldName = fieldName.substr(0, fieldName.indexOf('`'));
        return `نوع داده اشتباهی برای فیلد  ${fieldName} ارائه شده است `;
    } else if (hasString(message, 'Could not use specified')){
        let fieldName = message.substr(message.indexOf('`') +1, 15);
        fieldName = fieldName.substr(0, fieldName.indexOf('`'));
        return `مقدار فیلد ${fieldName} اشتباه می باشد .`;
    } else if (hasString(message, 'Invalid replacement foreign key value')) {
        return 'خطای کلید خارجی ، درخواست معتبر نمی باشد';
    } else {
        return message;
    }
};

/**
 * Get message based on a code or message
 * @param code
 * @param message
 * @returns {*}
 * @constructor
 */
const MessageHelper = (code, message) => {
    if (message === ''){
        return MESSAGES[code] || `NOT CONFIGURED MESSAGE :: ${code}`;
    } else {
        return checkORMErrors(message);
    }
};


module.exports = MessageHelper;
