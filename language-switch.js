(function () {
    var toggle = document.querySelector('.language-toggle');
    if (!toggle) return;
    var pending = false;
    var start;
    var initialLanguage = toggle.dataset.language;

    window.addEventListener('pageshow', function () {
        pending = false;
        start = null;
        toggle.dataset.language = initialLanguage;
    });
    toggle.addEventListener('dragstart', function (event) { event.preventDefault(); });

    function select(language) {
        if (pending || language === toggle.dataset.language) return;
        var link = toggle.querySelector('a[data-language="' + language + '"]');
        pending = true;
        toggle.dataset.language = language;
        var delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 180;
        window.setTimeout(function () { window.location.assign(link.href); }, delay);
    }

    toggle.addEventListener('click', function (event) {
        var link = event.target.closest('a');
        if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        event.preventDefault();
        select(link.dataset.language);
    });
    toggle.addEventListener('pointerdown', function (event) {
        if (event.button === 0) start = { x: event.clientX, y: event.clientY };
    });
    toggle.addEventListener('pointerup', function (event) {
        if (!start) return;
        var dx = event.clientX - start.x;
        var dy = event.clientY - start.y;
        start = null;
        if (Math.abs(dx) > 32 && Math.abs(dx) > Math.abs(dy)) select(dx > 0 ? 'zh' : 'en');
    });
    toggle.addEventListener('pointercancel', function () { start = null; });
})();
