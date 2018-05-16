$(document).ready(function() {
    var services = {
        listEmploys: function() {
            loadJSON('/api/employee', function(data){
                var list = '';
                for(var [index, value] of data.entries()) {
                    list += `
                    <div class="row">
                        <input type="text" class="col-md-5 current-name" value="${value.name}" />
                        <input type="text" class="col-md-5 current-role" value="${value.role}" />
                        <div class="col-md-1 btn btn-success edit" data-index="${value.id}">Edit</div>
                        <div class="col-md-1 btn btn-danger delete" data-index="${value.id}">Delete</div>
                    </div>`;
                }
                $('.list').html(list);
            });
        },
        addEmploy: function(addName, addRole) {
            loadJSON('/api/addemployee/'+addName+'/'+addRole, function(){ console.log("Added!"); });
            services.listEmploys();
        },
        editEmploy: function(index, newName, newRole) {
            loadJSON('/api/updateemployee/'+newName+'/'+newRole+'/'+index, function(){ console.log("Updated!"); });
            services.listEmploys();
        },
        deleteEmploy: function(index) {
            loadJSON('/api/deleteemployee/'+index, function(){ console.log("Deleted!"); });
            services.listEmploys();
        }
    };

    $('#list-employs').on('click', function() {
        services.listEmploys();
    });
    
    $('#add-employs').on('click', function() {
        services.addEmploy($('#addName').val(), $('#addRole').val());
        $('#addName, #addRole').val('');
    });
    
    $('.container').on('click', '.delete', function () {
        services.deleteEmploy($(this).attr('data-index'));
    });
    
    $('.container').on('click', '.edit', function () {
        services.editEmploy(
            $(this).attr('data-index'),
            $(this).siblings('.current-name').val(), 
            $(this).siblings('.current-role').val()
        );
    });

    function loadJSON(path, success, error) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    success(JSON.parse(xhr.responseText));
                } else {
                    error(xhr);
                }
            }
        };
        xhr.open('GET', path, true);
        xhr.send();
    }
});