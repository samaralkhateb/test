/**
 * Created by zain on 12/04/16.
 */
app = {};
app.events = app.events || {};

_.extend(app.events, Backbone.Events);
/* String tags from string
 * discuss at: http://phpjs.org/functions/strip_tags/
 * */
function strip_tags(input, allowed) {
    allowed = (((allowed || '') + '')
        .toLowerCase()
        .match(/<[a-z][a-z0-9]*>/g) || [])
        .join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return input.replace(commentsAndPhpTags, '')
        .replace(tags, function ($0, $1) {
            return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
        });
}

/* Inspired by http://bit.ly/juSAWl
 * Augment String.prototype to allow for easier formatting.  This implementation
 * doesn't completely destroy any existing String.prototype.format functions,
 * and will stringify objects/arrays.
 * */
String.prototype.format = function(i, safe, arg) {

    function format() {
        var str = this, len = arguments.length+1;

        // For each {0} {1} {n...} replace with the argument in that position.  If
        // the argument is an object or an array it will be stringified to JSON.
        for (i=0; i < len; arg = arguments[i++]) {
            safe = typeof arg === 'object' ? JSON.stringify(arg) : arg;
            str = str.replace(new RegExp('\\{'+(i-1)+'\\}', 'g'), safe);
        }
        return str;
    }

    // Save a reference of what may already exist under the property native.
    // Allows for doing something like: if("".format.native) { /* use native */ }
    format.native = String.prototype.format;

    // Replace the prototype property
    return format;

}();

//initialize bootstrap tooltip
// $(function () {
//     $('body').tooltip({
//         selector: '[data-toggle=tooltip]'
//     });
// })
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
