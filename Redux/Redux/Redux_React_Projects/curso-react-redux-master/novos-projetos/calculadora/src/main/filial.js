$(document).ready(function () {
    $('#cmbRegiao').change(function () {
        $.ajax({
            type: "post",  
            url: getRootWebSitePath() + "Filial/GetUF",
            data: { id_regiao: $('#cmbRegiao').val() },
            datatype: "json",
            traditional: true,
            success: function (data) {
                var district = "<select id='cmbEstados'>";
                district = district + '<option value="">Selecione</option>';
                for (var i = 0; i < data.length; i++) {
                    district = district + '<option value=' + data[i].Value + '>' + data[i].Text + '</option>';
                }
                district = district + '</select>';
                $('#cmbEstados').html(district);
            }
        });
    });
   
   
    if ($("#hid_selectedSubGrupo").val()) {
        var subgrupos = $("#hid_selectedSubGrupo").val().split('|');

        subgrupos.forEach(function (item) {
            var listBox = $("#lstSubgrupo");
            var option = $("<option />").val(item).html(item);
            listBox.append(option);
        });
    }

    if ($("#hid_departamentosUtilizados").val()) {
        var departamentos = $("#hid_departamentosUtilizados").val().split('|');
        var disponiveis = $("#DepartamentosDisponiveis")[0];
        departamentos.forEach(function (item) {
            for (var i = 0; i < disponiveis.options.length; i++) {
                if (disponiveis.options[i].value == item) {
                    var option = document.createElement("option");
                    option.value = disponiveis.options[i].value;
                    option.text = disponiveis.options[i].text;
                    $(listaCdDepartamento).append(option);
                    $("#DepartamentosDisponiveis")[0].options[i].remove();
                }
            }

        });
    }

    $('#cdFilial').keypress(function () {
        if (this.value.length >= 4)
            return false;
    });

    $('#descSubgrupo').keypress(function () {
        if (this.value.length >= 40)
            return false;
    });

    validaCampos("input");
    validaCampos("select");

});
function SalvarLista() {
    var listLength = lstSubgrupo.options.length;
    $("#hid_selectedSubGrupo").val('');
    for (var i = 0; i < listLength; i++) {
        var value = lstSubgrupo.options[i].text;
        $("#hid_selectedSubGrupo").val($("#hid_selectedSubGrupo").val() + value + '|');
    }

    var listLength2 = listaSubEtapas.options.length;
    $("#hid_departamentosUtilizados").val('');
    for (var i = 0; i < listLength2; i++) {
        var id_area = parseInt(listaSubEtapas.options[i].value);
        $("#hid_departamentosUtilizados").val($("#hid_departamentosUtilizados").val() + id_area.toString() + '|');
    }
}

function validaCampos(type) {
    var elements = document.getElementsByTagName(type);

    for (var i = 0; i < elements.length; i++) {
        elements[i].oninvalid = function (e) {
            e.target.setCustomValidity("");
            if (!e.target.validity.valid) {
                e.target.setCustomValidity("Campo " + $(this).attr("title") + " obrigatório");
            }
        };
        elements[i].oninput = function (e) {
            e.target.setCustomValidity("");
        };
    }

}

//function adicionarSubgrupo() {
//    var value = $("#subgrupo").val();
//    var listBox = $("#lstSubgrupo");
//    var option = $("<option />").val(value).html(value);

//    var hasItem = false;
//    if (!value)
//        return false;
//    $("#lstSubgrupo").find("option").filter(function (index) {
//        if (value === $(this).text())
//            hasItem = true;
//    });

//    if (!hasItem) {
//        listBox.append(option);
//        $("#subgrupo").val("");
//        return false;
//    } else
//        return false;
//};


function adicionarSubgrupo() {
    var value = $("#subgrupo").val();
    var valuesb = $("#descSubgrupo").val();
    var novoVal = value + " / " +  valuesb;
    var listBox = $("#lstSubgrupo");
    var option = $("<option />").val(novoVal).html(novoVal);

    var hasItem = false;
    if (!novoVal)
        return false;
    $("#lstSubgrupo").find("option").filter(function (index) {
        if (novoVal === $(this).text())
            hasItem = true;
    });

    if (!hasItem) {
        listBox.append(option);
        $("#subgrupo").val("");
        $("#descSubgrupo").val("");
        return false;
    } else
        return false;
};






function removerSubGrupo() {
    $("#lstSubgrupo option:selected").remove();
}
function AdicionarDepartamentos() {
    if (typeof DepartamentosDisponiveis != 'undefined') {
        $("#DepartamentosDisponiveis option:selected").each(function () {
            var cd_departamento = parseInt($(this).val());
            var ds_departamento = $(this).text();
            var option = document.createElement("option");
            option.value = cd_departamento;
            option.text = ds_departamento;
            $(listaCdDepartamento).append(option);
            $("#hid_departamentosUtilizados").val($("#hid_departamentosUtilizados").val() + cd_departamento.toString() + '|');
        });
        $("#DepartamentosDisponiveis option:selected").remove();

        OrdenarDepartamentosUsuario();
    }
};
function RemoverDepartamentos() {
    if (typeof listaCdDepartamento != 'undefined') {
        $("#listaCdDepartamento option:selected").each(function () {
            var cd_departamento = parseInt($(this).val());
            var ds_departamento = $(this).text();
            var option = document.createElement("option");
            option.value = cd_departamento;
            option.text = ds_departamento;
            $(DepartamentosDisponiveis).append(option);
            $("#hid_departamentosUtilizados").val($("#hid_departamentosUtilizados").val().replace(cd_departamento.toString() + '|', ''));
        });
        $("#listaCdDepartamento option:selected").remove();

        OrdenarDepartamentosDisponiveis();
    }
};
function OrdenarDepartamentosUsuario() {
    var selectOptions = $("#listaCdDepartamento option");
    selectOptions.sort(function (a, b) {
        if (parseInt(a.value) > parseInt(b.value)) {
            return 1;
        }
        else if (parseInt(a.value) < parseInt(b.value)) {
            return -1;
        }
        else {
            return 0
        }
    });
    $("#listaCdDepartamento").empty().append(selectOptions);
};
function OrdenarDepartamentosDisponiveis() {
    var selectOptions = $("#DepartamentosDisponiveis option");
    selectOptions.sort(function (a, b) {
        if (parseInt(a.value) > parseInt(b.value)) {
            return 1;
        }
        else if (parseInt(a.value) < parseInt(b.value)) {
            return -1;
        }
        else {
            return 0
        }
    });
    $("#DepartamentosDisponiveis").empty().append(selectOptions);
}
function abremenuManutencao() {
    $(".menu-active").removeClass("menu-active");
    $("#menuManutencao").addClass("menu-active");
};
function abremenuRelatorio() {
    $(".menu-active").removeClass("menu-active");
    $("#menuRelatorio").addClass("menu-active");
};
function lostFocus() {
    $(".menu-active").removeClass("menu-active");
};
function LimpaExistente() {
    $("#ddlPassaBloqueio").val("0").change();
    $("#passa_bloqueio").val(false);
    $("#ddlPassaCongelamentoComite").val("0").change();
    $("#passa_congelamento_comite").val(false);
    for (var i = 0; i < idlistaIdPerfil.options.length; ++i) {
        idlistaIdPerfil.options[i].checked = true;
        RemoverPerfil();
    }
};
function LimpaNovo() {
    $("#login").val('');
    $("#nome").val('');
    $("#ddlPassaBloqueio").val("0").change();
    $("#passa_bloqueio").val(false);
    $("#ddlPassaCongelamentoComite").val("0").change();
    $("#passa_congelamento_comite").val(false);
    $("#administrador").val(false);
    $("#ds_administrador").val("Não");
    $("#id_area").val("0").change();
    $("#selecionaPerfil").removeAttr("hidden");
    $('#listaIdPermissao option').prop('selected', true);  
    $('#selecionaDepartamento option').prop('selected', true);


    $("#cdFilial").val('');
    $("#dsFilial").val('');
    $("#hid_departamentosUtilizados").val('');
    $("#hid_selectedSubGrupo").val('');
    $('#cmbRegiao option').prop('selected', true);
    $("select#cmbRegiao ").prop('selectedIndex', 0);
    $("select#cmbEstados ").prop('selectedIndex', 0);
    
    $("#lstSubgrupo").empty()
   

    removerSubGrupo()
    RemoverDepartamentos();
};
function ValidaUsuario() {
    $.ajax({
        url: getRootWebSitePath() +  "ValidaUsuarioAD",
        type: "GET",
        data: { login: $("#login").val() },
        success: function (response) {
            var res = response.split("|");
            $("#nome").val(res[1]);
            if (res[2] == "Sim") {
                $("#administrador").val(true);
                $("#ds_administrador").val("Sim");
                $("#selecionaPerfil").attr("hidden", "hidden");
                $("#selecionaDepartamento").attr("hidden", "hidden");
            }
            else {
                $("#administrador").val(false);
                $("#ds_administrador").val("Não");
                $("#selecionaPerfil").removeAttr("hidden");
                $("#selecionaDepartamento").removeAttr("hidden");
            }
        },
        error: function (response) {
            $("#nome").val("");
        }
    });

}
function Desbloqueia() {
    $("#login").attr('disabled', false);
    $("#nome").attr('disabled', false);
    $("#administrador").attr('disabled', false);

    var listLength = lstSubgrupo.options.length;
    $("#hid_selectedSubGrupo").val('');
    for (var i = 0; i < listLength; i++) {
        var value = lstSubgrupo.options[i].text;
        $("#hid_selectedSubGrupo").val($("#hid_selectedSubGrupo").val() + value + '|');
    }



    var listLength2 = listaCdDepartamento.options.length;
    $("#hid_departamentosUtilizados").val('');
    for (var i = 0; i < listLength2; i++) {
        var value = parseInt(listaCdDepartamento.options[i].value);
        $("#hid_departamentosUtilizados").val($("#hid_departamentosUtilizados").val() + value + '|');
    }
}
$(document).ready(function () {
    var home = getRootWebSitePath();
    var volta = getRootWebSitePath() + "\\ManutencaoSistema\\CadastroParametros";
    $("#bcAnterior").attr('href', volta);
    $("#bcHome").attr('href', home);
    $("#btnVoltar").click(function () {
        $(location).attr('href', volta);
    });

    //if ($("#passa_bloqueio").val().toUpperCase() == "TRUE") {
    //    $("#ddlPassaBloqueio").val("1").change();
    //}
    //else {
    //    $("#passa_bloqueio").val(false);
    //    $("#ddlPassaBloqueio").val("0").change();
    //}

    //$("#ddlPassaBloqueio").change(function () {
    //    if ($('option:selected', this).text() == "Sim")
    //    { $("#passa_bloqueio").val(true) }
    //    else
    //    { $("#passa_bloqueio").val(false) };
    //});

    //if ($("#passa_congelamento_comite").val().toUpperCase() == "TRUE") {
    //    $("#ddlPassaCongelamentoComite").val("1").change();
    //}
    //else {
    //    $("#passa_congelamento_comite").val(false);
    //    $("#ddlPassaCongelamentoComite").val("0").change();
    //}

    //$("#ddlPassaCongelamentoComite").change(function () {
    //    if ($('option:selected', this).text() == "Sim")
    //    { $("#passa_congelamento_comite").val(true) }
    //    else
    //    { $("#passa_congelamento_comite").val(false) };
    //});

    OrdenarDepartamentosUsuario();
    OrdenarDepartamentosDisponiveis();
    //OrdenarPermissoesUsuario();
    //OrdenarPermissoesDisponiveis();

    ValidaUsuario();
});

//function EditarFilial(filial) {
//    $("#modalLoading").modal("show");
//    var getUrl = window.location;
//    var url = getRootWebSitePath() + "\\Filial\\EditarRegistroFilial";
//    var params = "?id=" + filial;
//    $.post(url, {
//        id: filial,
//    },
//    function (data) {
//        if (data.Mensagem == "") {
//            window.location.href = getUrl.pathname.replace("Filial", "SalvarFilial") + params + "&button=Editar";
//        }
//        else {
//            $("#modalLoading").modal("hide");
//            $("#txtError").html("<span>Não é possível editar a filial solicitada.<br/>A filial esta sendo utilizada pela seguinte solicitação.<br/>" + data.Mensagem + "</span>");
//            $("#ErrorAlert").delay(100).fadeIn();
//        }
//    });
//}
function getRootWebSitePath() {
    var root = "/";
    if (window.location.hostname != "localhost") {
        root = "/" + location.pathname.split('/')[1] + "/";
    }
    return root;
}