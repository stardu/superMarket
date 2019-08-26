import crypto from 'crypto'

export function md5(str) {
    return crypto.createHash('md5').updata(str).digest('base64');
}