/*
 * @Author: 余树
 * @Date: 2019-02-09 12:53:19
 * @Last Modified by: 余树
 * @Last Modified time: 2019-02-12 17:30:28
 * @description: Content-type
 */
'use strict'

const mime = {
  '.ogv': 'video/ogg',
  '.webm': 'video/webm',
  '.mp4': 'video/mp4',
  '.woff': 'application/x-font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.au': 'audio/basic',
  '.avi': 'video/avi,',
  '.bmp': 'image/bmp',
  '.bz2': 'application/x-bzip2',
  '.css': 'text/css',
  '.dtd': 'application/xml-dtd',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.dotx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
  '.es': 'application/ecmascript',
  '.exe': 'application/octet-stream',
  '.gif': 'image/gif',
  '.gz': 'application/x-gzip',
  '.hqx': 'application/mac-binhex40',
  '.html': 'text/html; charset=UTF-8',
  '.art': 'text/html; charset=UTF-8',
  '.jar': 'application/java-archive',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.midi': 'audio/x-midi',
  '.mp3': 'audio/mpeg',
  '.mpeg': 'video/mpeg',
  '.ogg': 'application/ogg',
  '.pdf': 'application/pdf',
  '.pl': 'application/x-perl',
  '.png': 'image/png',
  '.potx': 'application/vnd.openxmlformats-officedocument.presentationml.template',
  '.ppsx': 'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
  '.ppt': 'application/vnd.ms-powerpointtd>',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.ps': 'application/postscript',
  '.qt': 'video/quicktime',
  '.ra': 'audio/vnd.rn-realaudio',
  '.ram': 'audio/vnd.rn-realaudio',
  '.rdf': 'application/rdf+xml',
  '.rtf': 'application/rtf',
  '.sgml': 'text/sgml',
  '.sit': 'application/x-stuffit',
  '.sldx': 'application/vnd.openxmlformats-officedocument.presentationml.slide',
  '.swf': 'application/x-shockwave-flash',
  '.tar.gz': 'application/x-tar',
  '.tgz': 'application/x-tar',
  '.tiff': 'image/tiff',
  '.tsv': 'text/tab-separated-values',
  '.txt': 'text/plain',
  '.wav': 'audio/x-wav',
  '.wma': 'audio/x-ms-wma',
  '.wmv': 'video/x-ms-wmv',
  '.xlam': 'application/vnd.ms-excel.addin.macroEnabled.12',
  '.xls': 'application/vnd.ms-excel',
  '.xlsb': 'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.xltx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
  '.xml': 'application/xml',
  '.zip': 'application/zip,'
}

module.exports = mime
