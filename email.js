(function () {
    var user = ['boyuan', 'zhang'].join('.');
    var domain = ['uky', 'edu'].join('.');
    var address = user + String.fromCharCode(64) + domain;

    document.querySelectorAll('[data-email]').forEach(function (link) {
        link.textContent = address;
        link.href = 'mailto:' + address;
    });
})();
