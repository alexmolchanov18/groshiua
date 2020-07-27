window.addEventListener('load', function() {
    $.get('https://moneygus.com/cookie.php', function(data) {
        if (typeof(data.status) != 'undefined' && data.status) {
            window.location.href = '/';
        } else {
            $('.hidden-body').removeClass('hidden-body');
        }
    });
});