jQuery(document).ready(function ($) {


    $('[data-toggle="ajaxModal"]').on('click',
        function (e) {
            $('#ajaxModal').remove();
            e.preventDefault();
            var $this = $(this),
                $remote = $this.data('remote') || $this.attr('href'),
                $modal = $('<div class="modal" id="ajaxModal"><div class="modal-body"></div></div>');
            $('body').append($modal);
            $modal.modal({
                backdrop: 'static',
                keyboard: false
            });
            $modal.load($remote);

        }
    );
});