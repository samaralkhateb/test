$(function () {

    $("#accounting_parent").addClass("active");
    $("#general_journal").addClass("active");

    $(".datepicker").datepicker({
        format: 'yyyy-mm-dd',
    });


    var count = 1;
    var btn_add = $('#btn-add');
    var table = $('table');

    btn_add.on('click', function () {
        table.append(
            '<tr><td>' + (count += 1) + '</td><td>  <select name="" id="" class="select-box"><option value="">Nothing Selected</option>' +
            '</select> </td> </td> <td> <input type="text" class="form-control"></td>   <td><input type="text" class="form-control" value="0"> </td>' +
            '<td><input type="text" class="form-control" value="0"></td> <td><select name="" id="" class="form-control"><option value="">SYP </option>' +
            '</select></td><td><input type="text" class="form-control" value="1"> </td><td> <input type="text" class="form-control" value="0" disabled>' +
            '</td><td><input type="text" class="form-control"> </td><td><i class="fa fa-trash-o" aria-hidden="true" id="btn-delete"></i>    </td>"  '

        )
    });

    $('tbody').on('click','#btn-delete',function() {
       $(this).parents("tr").remove();
       --count;
 
    });

});