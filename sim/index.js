

var jsstoreCon = new JsStore.Connection();

var confirmImportSuccessfull = 'Não feche esta página (X). \nNão atualize esta página (F5). \n\nVolte na página anterior (aba ao lado) e pesquise pela palavra "configuração concluída com sucesso." \n\nQuando a palavra aparecer, a configuração terminou com sucesso.';
var COL_LOGOTIPO = 5;

window.onload = function () {
	var mygroup = selectMygroup.value.trim();
	var mycode = '';
	var mytext = '';
	var myorder = '';
	if (mygroup == '' && mycode == '') {
		mycode = '0';
	}
	refreshTableData(mycode, myorder, mygroup, mytext);
	
    registerEvents();
    initDb();
	loadCombobox('mygroup', '0', '4', 'Teste');
	loadCombobox('mycode', '0', '65', 'Número');
	loadCombobox('myorder', '0', '65', 'Ordem');
	showForm1Form2();
	$('#selectMygroup').focus();
	$('#selectMygroup').select();
//	localStorage.setItem('valueText1', document.getElementById('selectMygroup').selectedIndex);
//	localStorage.setItem('valueText2', '');
//	setCookie('valueText3', '', '1');
};

async function initDb() {
    var isDbCreated = await jsstoreCon.initDb(getDbSchema());
    if (isDbCreated) {
        console.log('db created');
		document.getElementById('txtSearch').value = 'sucesso';
		//$('#tblGrid tbody').html('clique no botão iniciar configuração');
		document.getElementById('divconfig').style.display = 'block';
    }
    else {
        console.log('db opened');
//		document.getElementById('txtSearch').value = 'opened';
     }
}

function getDbSchema() {
	var table = {
        name: 'Student',
        columns: {
			id: { primaryKey: true, autoIncrement: true },
			mygroup: { notNull: true, dataType: 'string' }, //qual grupo a pergunta pertence, exempçlo: domínio 1, domínio 2, domínio 3...
			mycode: { notNull: true, dataType: 'string' }, //código único numérico da pergunta
			mytext: { notNull: true, dataType: 'string' }, //uma pergunta
			mysearch: { Null: false, dataType: 'string' }, //pergunta ou texto sem os caracteres especiais para fazer o search com maior precisão
			myorder: { Null: true, dataType: 'string' }, //ordem de exibição
			mycorrect1: { Null: false, dataType: 'string' }, //texto da resposta correta 1
			mycorrect2: { Null: false, dataType: 'string' }, //texto da resposta correta 2
			mycorrect3: { Null: false, dataType: 'string' }, //texto da resposta correta 3
			mycorrect4: { Null: false, dataType: 'string' }, //texto da resposta correta 4
			myincorrect1: { Null: false, dataType: 'string' }, //texto da resposta errada 1
			myincorrect2: { Null: false, dataType: 'string' }, //texto da resposta errada 2
			myincorrect3: { Null: false, dataType: 'string' }, //texto da resposta errada 3
			myincorrect4: { Null: false, dataType: 'string' }, //texto da resposta errada 4
			mycorrect1answer: { Null: false, dataType: 'string' }, //explicação
			mycorrect2answer: { Null: false, dataType: 'string' }, //texto da resposta correta 2
			mycorrect3answer: { Null: false, dataType: 'string' }, //texto da resposta correta 3
			mycorrect4answer: { Null: false, dataType: 'string' }, //texto da resposta correta 4
			myincorrect1answer: { Null: false, dataType: 'string' }, //texto da resposta errada 1
			myincorrect2answer: { Null: false, dataType: 'string' }, //texto da resposta errada 2
			myincorrect3answer: { Null: false, dataType: 'string' }, //texto da resposta errada 3
			myincorrect4answer: { Null: false, dataType: 'string' }, //texto da resposta errada 4
			mycomment: { Null: false, dataType: 'string' }, //comentário ou resposta sobre a letra
			myfix: { Null: false, dataType: 'string' }, //fixa para revisão
            mytimer: { Null: false, dataType: 'string' }, //cronômetro numérico em segundos para mudar o texto automaticamente, exemplo: 4s
            mytimermax: { Null: false, dataType: 'string' }, //cronômetro numérico em segundos para mudar o texto automaticamente, exemplo: 4s
			mycodeTry: { Null: true, dataType: 'string' }, //código único
			mystatus: { Null: false, dataType: 'string' }, //0=inativo, 1=ativo, padrão é ativo
			myqtde: { Null: false, dataType: 'string' }, //quantidade de respostas a serem exibidas, o padrão é totalizar 4
            myowner: { Null: false, dataType: 'string' }, //dono do texto ou responsável por inserir na tabela
			myversion: { Null: false, dataType: 'string' }, // versão da pergunda para indicar que houve alteração
            mymodified: { Null: false, dataType: 'string' }, //aaaammdd hhmmss, momento que o texto foi alterado
            mycreated: { Null: false, dataType: 'string' }, //aaaammdd hhmmss, momento que o texto foi criado
            fontfamily: { Null: false, dataType: 'string' },
            fontsize: { Null: false, dataType: 'string' },
            color: { Null: false, dataType: 'string' },
            textalign: { Null: false, dataType: 'string' },
            backgroundcolor: { Null: false, dataType: 'string' },
            camporeserva: { Null: false, dataType: 'string' }
        }
    }

	var tableHistory = {
        name: 'History',
        columns: {
			id: { primaryKey: true, autoIncrement: true },
			mycodeTry: { notNull: true, dataType: 'string' }, //código único
			mytry: { notNull: true, dataType: 'string' }, //número da tentatica, exemplo: 1, 2, 3...; tentativa 1, tentativa 2, tentativa 3...
			mypercent: { notNull: true, dataType: 'string' }, //porcentagem que conseguiu
			mycorrects: { notNull: true, dataType: 'string' }, //pquantidade de perguntas corretas
			myincorrects: { notNull: true, dataType: 'string' }, //quantidade de perguntas erradas
			mytotal: { notNull: true, dataType: 'string' } //quantidade de perguntas
        }
    }

    var db = {
        name: 'mydbsim',
        tables: [table, tableHistory]
    }
    return db;
}



function registerEvents() {
    $('#btnSelectCountAll').click(function () {
		selectCountAll();
    })	
    $('#txtSearch').keyup(function () {
		if (event.keyCode == 13 || event.which == 13) { //13=tecla ENTER
			var mycode = document.getElementById('mycode').value;
			var myorder = document.getElementById('myorder').value;
			var mygroup = document.getElementById('mygroup').value;
			var mytext = document.getElementById('mytext').value.trim();
			refreshTableData(mycode, myorder, mygroup, mytext);
			if (document.getElementById('txtSearch').value.length <= 1) { // pesquisa somente com mais de 1 caracter preenchido no campo search
				if (document.getElementById('selectMygroup').selectedIndex == '1') {
					showBible();
				}
			} else {
				showGridAndHideForms();
			}
			$('#selectMygroup').focus();
			$('#selectMygroup').select();
		} else if (event.keyCode == 27 || event.which == 27) { //ESC
			$('#selectMygroup').focus();
			$('#selectMygroup').select();
			freezeDataShow('true');
		}
    })
    $('#btnPrevious').click(function () {
		var mygroup = document.getElementById('mygroupSim').value;
		var mycode = parseInt(document.getElementById('mycodeSim').value) - 1;
		var myid = document.getElementById('myidSim').value;
		updateStudentPlay(myid);
		getFromTablePlay(myid, mygroup, mycode);
    })
    $('#btnNext').click(function () {
		var mygroup = document.getElementById('mygroupSim').value;
		var mycode = parseInt(document.getElementById('mycodeSim').value) + 1;
		var myid = document.getElementById('myidSim').value;
		updateStudentPlay(myid);
		getFromTablePlay(myid, mygroup, mycode);
    })
    $('#btnRefresh').click(function () {
		var mygroup = document.getElementById('selectMygroup').value;
		var mycode = '';
		var myorder = '';
		var mytext = '';
		refreshTableData(mycode, myorder, mygroup, mytext);
		showGridAndHideForms();
		$('#selectMygroup').focus();
		$('#selectMygroup').select();
    })
    $('#btnSearch').click(function () {
		var mygroup = document.getElementById('mygroup').value;
		var mycode = document.getElementById('mycode').value;
		var myorder = document.getElementById('myorder').value;
		var mytext = document.getElementById('mytext').value.trim();
		refreshTableData(mycode, myorder, mygroup, mytext);
		showGridAndHideForms();
//		$('#txtSearch').focus();
//		$('#txtSearch').select();
		document.getElementById('btnIndexConfigurar').style.display='none';
    })
    $('#btnIndexConfigurar').click(function () {
		window.close();
		var DataShow_Config = window.open("config.html", "datashowconfig", "top=0, width=400, height=200, left=500, location=no, menubar=no, resizable=no, scrollbars=no, status=no, titlebar=no, toolbar=no");
		var DataShow_ConfigResult = window.open("configresult.html", "datashowconfigresult");
		datashowconfigresult.focus();
	})
    $('#btnCertifications').click(function () {
		window.close();
		var DataShow_Tests = window.open("certifications.html", "datashowcertifications");
		datashowconfigresult.focus();
	})
    $('#selectMygroup').change(function () {
		var mygroup = selectMygroup.value.trim();
		var mycode = '';
		var mytext = '';
		var myorder = '';
		if (mygroup == '' && mycode == '') {
			mycode = '0';
		}
		refreshTableData(mycode, myorder, mygroup, mytext);
		showGridAndHideForms();
		$('#selectMygroup').focus();
		$('#selectMygroup').select();
    })
    $('#btnDeleteLirics').click(function () {
		deleteTable();
    })
    $('#btnDropDb').click(function () {
		dropdb();
    })
    $('#btnImportArt').click(function () {
		document.getElementById('selectMygroup').selectedIndex = 2;
		openFile(dispFile);
    })
    $('#btnImport').click(function () {
		document.getElementById('selectMygroup').selectedIndex = 0;
		openFile(dispFile);
    })
    $('#btnImportBible').click(function () {
		document.getElementById('selectMygroup').selectedIndex = 1;
		openFile(dispFile);
    })
    $('#btnConfirmImportManual').click(function () {
//		var result = confirm('Confirma?');
//		if (result) {
			try {
				var mycode = document.getElementById('mycode').value;
				var myorder = document.getElementById('myorder').value;
				var mygroup = document.getElementById('mygroup').value;
				var mytext = document.getElementById('mytext').value.trim();
				var mycorrect1 = document.getElementById('mycorrect1').value.trim();
				var mycorrect2 = document.getElementById('mycorrect2').value.trim();
				var mycorrect3 = document.getElementById('mycorrect3').value.trim();
				var mycorrect4 = document.getElementById('mycorrect4').value.trim();
				var myincorrect1 = document.getElementById('myincorrect1').value.trim();
				var myincorrect2 = document.getElementById('myincorrect2').value.trim();
				var myincorrect3 = document.getElementById('myincorrect3').value.trim();
				var myincorrect4 = document.getElementById('myincorrect4').value.trim();
				
//alert('mycode='+mycode + ' myorder='+myorder + ' mygroup='+mygroup + ' mytext='+mytext + ' mycorrect1='+mycorrect1 + ' myincorrect1='+myincorrect1);
				
				confirmImportManual(mycode, myorder, mygroup, mytext, mycorrect1, mycorrect2, mycorrect3, mycorrect4, myincorrect1, myincorrect2, myincorrect3, myincorrect4);
//				alert('Clique em "Go back". \nClique em "Go back".');
//				document.getElementById("formAdd").submit();
			} catch (ex) {
				alert(ex.message);
			}
//		}
    })
	
    $('#btnConfigForward').click(function () {
		var result = confirm('Confirma configuração automática? \n\nNão faça nada. Aguarde alguns segundos...');
		if (result) {
			document.getElementById('selectMygroup').selectedIndex = 1;
			confirmImport('contents2', '1'); //bíblia
			document.getElementById('selectMygroup').selectedIndex = 2;
			confirmImport('contents3', '2'); //artes
			document.getElementById('selectMygroup').selectedIndex = 0;
			confirmImport('contents1', '0'); //a última frase é testada na pesquisa de letras
//			alert(confirmImportSuccessfull);
		} else {
			alert('Configuração cancelada.');
		}
    })
    $('#btnCancelImport').click(function () {
		showGridAndHideForms();
    })
    $('#btnCancelAddNewManual').click(function () {
		showGridAndHideForms();
    })
    $('#btnCancelGear').click(function () {
		showGridAndHideForms();
    })
    $('#btnCancel').click(function () {
 		showGridAndHideForms();
    })
	$('#btnLogo').click(function () {
		showLogo();
    })
    $('#btnFreeze').click(function () {
        freezeDataShow(localStorage.getItem('valueAoVivo'));
    })
    $('#btnAddStudent').click(function () {
        showFormImport();
    })
    $('#btnShowStudent').click(function () {
        showForm1Form2();
		showGridAndHideForms();
    })
    $('#btnShowHelp').click(function () {
		var DataShow_Help = window.open("help/help.pdf", "datashowhelp", "top=100, width=1100, height=10000, left=0, location=no, menubar=no, resizable=no, scrollbars=no, status=no, titlebar=no, toolbar=no");
    })
    $('#btnShowHelpConfig').click(function () {
		var DataShow_Help = window.open("help/helpconfig.pdf", "datashowhelp", "top=100, width=1100, height=10000, left=0, location=no, menubar=no, resizable=no, scrollbars=no, status=no, titlebar=no, toolbar=no");
    })
    $('#btnSubmit').click(function () {
		var studentId = $('form').attr('data-student-id');
		if (studentId) {
			updateStudent(studentId);
		} else {
			addStudentImport(studentId);
		}
    });
    $('#btnAddNewManual').click(function () {
		if (document.getElementById('divFormAddUpdate').style.display == 'none') {
			clearForm();
			showFormAddUpdate();
		} else {
			showGridAndHideForms();
		}
    });	
    $('#tblGrid tbody').on('click', '.edit', function () {
		var row = $(this).parents().eq(1);
        var child = row.children();
		var id = row.attr('itemid');
		var mygroup = child.eq(0).text();
		var mycode = child.eq(1).text();
		getFromTable(id, mygroup, mycode);
		showFormAddUpdate();
    });
    $('#tblGrid tbody').on('click', '.delete', function () {
        var result = confirm('Excluir, ok?');
        if (result) {
            var studentId = $(this).parents().eq(1).attr('itemid');
            deleteStudent(Number(studentId));
        }
    });
    $('#tblGrid tbody').on('click', '.playsim', function () {
//        var result = confirm('Começar, ok?');
//        if (result) {
			var row = $(this).parents().eq(1);
			var child = row.children();
			var id = row.attr('itemid');
			var mygroup = child.eq(0).text();
			var mycode = child.eq(1).text();
			getFromTablePlay(id, mygroup, mycode);
			showFormSim();
//        }
    });		
    $('#tblGrid tbody').on('click', '.freeze', function () {
		freezeDataShow(localStorage.getItem('valueAoVivo'));
    });
    $('#tblGrid tbody').on('click', '.logo', function () {
		showLogo();
//		freezeDataShow('false');
    });
    $('#tblGrid tbody').on('click', '.complete', function () {
		searchComplete();
    });
    $('#tblGrid tbody').on('click', '.videoplaypause', function () {
		videoPlayPause();
    });
	
    $('#tblGrid tbody').on('click', '.simulator', function () {
		var row = $(this).parents().eq(1);
        var child = row.children();
		var id = row.attr('itemid');
		var mysim = child.eq(2).text();
		alert(mysim);
    });
	$('#btnSimulator').click(function () {
		var array = [];
		var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
		for (var i = 0; i < checkboxes.length; i++) {
		  array.push(checkboxes[i].value);
		}
		alert(array);
    });
	$('#btnBackward').click(function () {
		showGridAndHideForms();
    });

	$('#btnGear').click(function () {
		if (document.getElementById('divGear').style.display == 'none') {
			showFormGear();
		} else {
			showGridAndHideForms();
		}
    })
	
}



//This function select table play
async function getFromTablePlay(id, mygroup, mycode) {
    try {
		var students = await jsstoreCon.select({
			from: 'Student'
			  , where: { mygroup: '' + mygroup + ''
					   , mycode: '' + mycode + ''
			  }
		});
		students.forEach(function (student) {
			document.getElementById('myidSim').style.display='none';
			document.getElementById('mygroupSim').style.display='none';
			document.getElementById('mycodeSim').style.display='none';
			document.getElementById('myorderSim').style.display='none';
			document.getElementById('mycorrect1Sim').style.display='none';
			document.getElementById('mycorrect2Sim').style.display='none';
			document.getElementById('mycorrect3Sim').style.display='none';
			document.getElementById('mycorrect4Sim').style.display='none';
			document.getElementById('myincorrect1Sim').style.display='none';
			document.getElementById('myincorrect2Sim').style.display='none';
			document.getElementById('myincorrect3Sim').style.display='none';
			document.getElementById('myincorrect4Sim').style.display='none';

			$('#myidSim').val(student.id);
			$('#mygroupSim').val(student.mygroup);
			$('#mycodeSim').val(student.mycode);
			$('#myorderSim').val(student.myorder);
			
			document.getElementById('mytextSim').innerHTML = '<b>' + student.mycode + '. ' + student.mytext + '</b>';

				//alert('student.mycorrect1answer='+student.mycorrect1answer);
			if (student.mycorrect1) {
				document.getElementById('mycorrect1answer').innerHTML = '<input id="chkMycorrect1answer" type=checkbox value="" '+student.mycorrect1answer+'> ' + student.mycorrect1 + ' <a href="#" class="btn btn-default"><i class="fa fa-arrow-down"></i></a>';
				document.getElementById('mycorrect1Sim').style.display='block';
			}
				//alert('student.mycorrect2answer='+student.mycorrect2answer);
			if (student.mycorrect2) {
				document.getElementById('mycorrect2answer').innerHTML = '<input id="chkMycorrect2answer" type=checkbox value="" '+student.mycorrect2answer+'> ' + student.mycorrect2 + ' <a href="#" class="btn btn-default"><i class="fa fa-arrow-down"></i></a>';
				document.getElementById('mycorrect2Sim').style.display='block';
			}
				//alert('student.mycorrect3answer='+student.mycorrect3answer);
			if (student.mycorrect3) {
				document.getElementById('mycorrect3answer').innerHTML = '<input id="chkMycorrect3answer" type=checkbox value="" '+student.mycorrect3answer+'> ' + student.mycorrect3 + ' <a href="#" class="btn btn-default"><i class="fa fa-arrow-down"></i></a>';
				document.getElementById('mycorrect3Sim').style.display='block';
			}
				//alert('student.mycorrect4answer='+student.mycorrect4answer);
			if (student.mycorrect4) {
				document.getElementById('mycorrect4answer').innerHTML = '<input id="chkMycorrect4answer" type=checkbox value="" '+student.mycorrect4answer+'> ' + student.mycorrect4 + ' <a href="#" class="btn btn-default"><i class="fa fa-arrow-down"></i></a>';
				document.getElementById('mycorrect4Sim').style.display='block';
			}

				//alert('student.myincorrect1answer='+student.myincorrect1answer);
			if (student.myincorrect1) {
				document.getElementById('myincorrect1answer').innerHTML = '<input id="chkMyincorrect1answer" type=checkbox value="" '+student.myincorrect1answer+'> ' + student.myincorrect1 + ' <a href="#" class="btn btn-default"><i class="fa fa-arrow-down"></i></a>';
				document.getElementById('myincorrect1Sim').style.display='block';
			}
				//alert('student.myincorrect2answer='+student.myincorrect2answer);
			if (student.myincorrect2) {
				document.getElementById('myincorrect2answer').innerHTML = '<input id="chkMyincorrect2answer" type=checkbox value="" '+student.myincorrect2answer+'> ' + student.myincorrect2 + ' <a href="#" class="btn btn-default"><i class="fa fa-arrow-down"></i></a>';
				document.getElementById('myincorrect2Sim').style.display='block';
			}
				//alert('student.myincorrect3answer='+student.myincorrect3answer);
			if (student.myincorrect3) {
				document.getElementById('myincorrect3answer').innerHTML = '<input id="chkMyincorrect3answer" type=checkbox value="" '+student.myincorrect3answer+'> ' + student.myincorrect3 + ' <a href="#" class="btn btn-default"><i class="fa fa-arrow-down"></i></a>';
				document.getElementById('myincorrect3Sim').style.display='block';
			}
				//alert('student.myincorrect4answer='+student.myincorrect4answer);
			if (student.myincorrect4) {
				document.getElementById('myincorrect4answer').innerHTML = '<input id="chkMyincorrect4answer" type=checkbox value="" '+student.myincorrect4answer+'> ' + student.myincorrect4 + ' <a href="#" class="btn btn-default"><i class="fa fa-arrow-down"></i></a>';
				document.getElementById('myincorrect4Sim').style.display='block';
			}
		})
    } catch (ex) {
        alert(ex.message)
    }	
}

//This function select table
async function getFromTable(id, mygroup, mycode) {
	var students = await jsstoreCon.select({
		from: 'Student'
		  , where: { mygroup: {like: '' + mygroup + ''} 
				   , mycode: '' + mycode + ''
				   , id: {like: '' + id + ''} 
		  }
	});

	students.forEach(function (student) {
		$('form').attr('data-student-id', student.id);
		$('#mygroup').val(student.mygroup);
		$('#mycode').val(student.mycode);
		$('#myorder').val(student.myorder);
		$('#mytext').val(student.mytext);
		$('#mycorrect1').val(student.mycorrect1);
		$('#mycorrect2').val(student.mycorrect2);
		$('#mycorrect3').val(student.mycorrect3);
		$('#mycorrect4').val(student.mycorrect4);
		$('#myincorrect1').val(student.myincorrect1);
		$('#myincorrect2').val(student.myincorrect2);
		$('#myincorrect3').val(student.myincorrect3);
		$('#myincorrect4').val(student.myincorrect4);
	})
}

//This function load combobox
async function loadCombobox(name, min, max, text) {
	for (var item=min; item<=max; item++) {
		var option = new Option(text + ' ' + item, item);
		document.getElementById(name).add(option);
	}
}

async function clearForm() {
	$('form').attr('data-student-id', null);
	$('#mytext').val('');
	$('#mycorrect1').val('');
	$('#mycorrect2').val('');
	$('#mycorrect3').val('');
	$('#mycorrect4').val('');
	$('#myincorrect1').val('');
	$('#myincorrect2').val('');
	$('#myincorrect3').val('');
	$('#myincorrect4').val('');
}

//This function delete the table
async function deleteTable() {
    try {
        var result = confirm('delete all Table?');
        if (result) {
			var noOfStudentRemoved = await jsstoreCon.remove({
				from: 'Student'
			});
			console.log(`${noOfStudentRemoved} students removed`);
			var mycode = document.getElementById('mycode').value;
			var myorder = document.getElementById('myorder').value;
			var mygroup = document.getElementById('mygroup').value;
			var mytext = document.getElementById('mytext').value.trim();
			refreshTableData(mycode, myorder, mygroup, mytext);
			alert('successfull');
		}
    } catch (ex) {
        alert(ex.message);
    }
}

//This function drop database
async function dropdb() {
	var result = confirm('Reiniciar?');
	if (result) {
		jsstoreCon.dropDb().then(function() {
			console.log('Db deleted successfully');
			var mycode = document.getElementById('mycode').value;
			var myorder = document.getElementById('myorder').value;
			var mygroup = document.getElementById('mygroup').value;
			var mytext = document.getElementById('mytext').value.trim();
			refreshTableData(mycode, myorder, mygroup, mytext);
			alert('successfull');
		}).catch(function(error) {
			console.log(error);
		});;
		showIniciarConfiguracao();
	}
}

function onLoadConfig() {
	confirmImport('contents3', '2'); //artes
	confirmImport('contents1', '0'); //letras
	confirmImport('contents2', '1'); //bíblia
	confirmImport('contents4', '3'); //licença
}

//This function refreshes the table
async function refreshTableResult() {
    try {
		//Perguntas
		var students = await jsstoreCon.count({
			from: 'Student'
		});
		if (students == '0') {
			var labelStudents = "<label class=\"btn btn-default\" style=\"width:200px; \"> Letras: " + students + "</label>";
		} else if (students > '0' && students < '10830') {
			var labelStudents = "<label class=\"btn btn-default\" style=\"width:200px; \"> Letras: " + students + " de ~10892 </label>";
		} else {
			var labelStudents = "<label class=\"btn btn-info\" style=\"width:200px; \"> Letras: " + students + " <i class=\"fa fa-check\"></i></label>";
		}
		
		var buttonFechar = "";
		if (students == '0') {
			buttonFechar = '<button class="btn btn-default" style="padding:9px 15px 9px 15px; width:200px;"> Aguarde o botão continuar...</button>';
		} else {
			buttonFechar = '<button class="btn btn-danger" onclick="showIndex();" style="padding:9px 15px 9px 15px; width:200px;"> Continuar <i class="fa fa-forward"></i> </button>';
			showIndex();
			alert('Pronto! Fim da configuração.');
		}
		//Resultado
		$('#tblGrid tbody').html(labelStudents + '<br/>' + '<br/>' + buttonFechar);
	} catch (ex) {
        alert(ex.message)
    }
}

function showIndex() {
	localStorage.setItem('valueOwner', document.getElementById('config_myowner').value);
	localStorage.setItem('valueLogo', document.getElementById('config_mylogo').value);
	localStorage.setItem('valuePlanoFundoMestre', document.getElementById('config_myfundo').value);
	var DataShow_Index = window.open("index.html", "_self", "location=no, menubar=no, resizable=no, scrollbars=no, status=no, titlebar=no, toolbar=no");
}

function showLogo() {
	if (localStorage.getItem('valueLogoBig') == 'true') {
		localStorage.setItem('valueLogoBig', 'false');
	} else if (localStorage.getItem('valueLogoBig') == 'false') {
		localStorage.setItem('valueLogoBig', '');
	} else if (localStorage.getItem('valueLogoBig') == '') {
		localStorage.setItem('valueLogoBig', 'true');
	}
	
	if (localStorage.getItem('valueLogoBig') == 'true') {
		document.getElementById('btnLogoTop').innerHTML = '<i class="fa fa-minus"></i> Logo';
		document.getElementById('btnLogoTop').classList.remove('btn-default');
		document.getElementById('btnLogoTop').classList.add('btn-info');
	} else if (localStorage.getItem('valueLogoBig') == 'false') {
		document.getElementById('btnLogoTop').innerHTML = '<i class="fa fa-times"></i> Logo';
		document.getElementById('btnLogoTop').classList.remove('btn-info');
		document.getElementById('btnLogoTop').classList.add('btn-default');
	} else if (localStorage.getItem('valueLogoBig') == '') {
		document.getElementById('btnLogoTop').innerHTML = '<i class=\"fa fa-plus\"></i> Logo';
		document.getElementById('btnLogoTop').classList.remove('btn-info');
		document.getElementById('btnLogoTop').classList.add('btn-default');
	}
}

//This function freeze screen DataShow
async function freezeDataShow(aovivo) {
    try {
		if (aovivo == 'false') { //unfreeze DataShow
			localStorage.setItem('valueAoVivo', 'true');
			if (document.getElementById('btnFreezeTop') != null) {
				document.getElementById('btnFreezeTop').innerHTML = '<i class="fa fa-lock"></i> Congela';
				document.getElementById('btnFreezeTop').classList.remove('btn-danger');
				document.getElementById('btnFreezeTop').classList.add('btn-success');
			}
		} else { //freeze DataShow
			localStorage.setItem('valueAoVivo', 'false');
			if (document.getElementById('btnFreezeTop') != null) {
				document.getElementById('btnFreezeTop').innerHTML = 'Ao Vivo';
				document.getElementById('btnFreezeTop').classList.remove('btn-default');
				document.getElementById('btnFreezeTop').classList.add('btn-danger');
			}
		}
    } catch (ex) {
        alert(ex.message);
    }
}

//This function text repeated = myrepeated>0
async function searchComplete() {
    try {
		var mycode = document.getElementById('mycode').value;
		var myorder = document.getElementById('myorder').value;
		var mygroup = document.getElementById('mygroup').value;
		var mytext = document.getElementById('mytext').value.trim();
		if (localStorage.getItem('valueComplete') == 'true') {
			localStorage.setItem('valueComplete', 'false');
			document.getElementById('btnCompleteTop').innerHTML = '<i class=\"fa fa-minus\"></i>';
			refreshTableData(mycode, myorder, mygroup, mytext);
//			document.getElementById('btnCompleteTop').classList.remove('btn-warning');
//			document.getElementById('btnCompleteTop').classList.add('btn-default');
		} else {
			localStorage.setItem('valueComplete', 'true');
			document.getElementById('btnCompleteTop').innerHTML = '<i class=\"fa fa-list\"></i>';
			refreshTableData(mycode, myorder, mygroup, mytext);
//			document.getElementById('btnCompleteTop').classList.remove('btn-default');
//			document.getElementById('btnCompleteTop').classList.add('btn-warning');
		}
    } catch (ex) {
        alert(ex.message);
    }
}

//This function play ou pause video in screen 2
async function videoPlayPause() {
    try {
		if (localStorage.getItem('valueVideoPlay') == 'true') {
			localStorage.setItem('valueVideoPlay', 'false');
			document.cookie="valueVideoPlay=false; expires=Thu, 24 Jun 2050 12:00:00 GMT";
			document.getElementById('btnVideoPlayTop').innerHTML = '<i class="fa fa-play"></i>';
			document.getElementById('btnVideoPlayTop').classList.remove('btn-default');
			document.getElementById('btnVideoPlayTop').classList.add('btn-info');
//			localStorage.setItem('valueFullScreen', 'true');
		} else {
			localStorage.setItem('valueVideoPlay', 'true');
			document.cookie="valueVideoPlay=true; expires=Thu, 24 Jun 2050 12:00:00 GMT";
			document.getElementById('btnVideoPlayTop').innerHTML = '<i class=\"fa fa-pause\"></i>';
			document.getElementById('btnVideoPlayTop').classList.remove('btn-info');
			document.getElementById('btnVideoPlayTop').classList.add('btn-default');
		}
    } catch (ex) {
        alert(ex.message);
    }
}

//This function text repeated = myrepeated=0
async function searchSimples() {
    try {
		var mycode = document.getElementById('mycode').value;
		var myorder = document.getElementById('myorder').value;
		var mygroup = document.getElementById('mygroup').value;
		var mytext = document.getElementById('mytext').value.trim();
		refreshTableData(mycode, myorder, mygroup, mytext);
    } catch (ex) {
        alert(ex.message);
    }
}

//This function confirm import
async function confirmImport(contents, group) {
//	var result = confirm('Não feche esta página. \nNão atualize esta página.');
//	if (result) {
		try {
			valor = document.getElementById(contents).value;
			var nextpos = 0; var myorder = 0; var mycode = ''; var myrepeated = '0'; var contador = 0; var posicao = 0; repeated = 0;
			for (posicao=0; posicao<=valor.length; posicao++) {
				nextpos = valor.indexOf('\n\n', posicao); //próximo separador do texto correspondente a duas quebras de linhas juntas
				if (nextpos <= 0) {
					nextpos = valor.length; //força última gravação e encerra
				}
				if (valor.substring(posicao, posicao+3) == '<p>' || valor.substring(posicao, posicao+4) == '<br>' || valor.substring(posicao, posicao+4) == '<hr>') {
					posicao = posicao+4; //pula <p>\n
					mycode = removeSpecials(valor.substring(posicao, nextpos).trim());
					myorder = 0;
					contador = parseInt(contador) + 1;
					console.log('Importar: \n' + mycode);
					document.getElementById('txtSearch').value = parseInt(contador) + ' importados';
				} else if (posicao == 0) { //primeiro registro sem separador <p>... executa somente 1 vez.
					mycode = removeSpecials(valor.substring(posicao, nextpos).trim());
				}
/*
				myrepeated = valor.substring(posicao, nextpos).indexOf('<repeat>', 0); //próximo separador do texto correspondente a duas quebras de linhas juntas
				alert(myrepeated);
				if (myrepeated > 0) {
					valor = valor.replaceAll('<repeat>', '');
					myrepeated = '1';
				} else {
					myrepeated = '1';
				}
*/
				var mytext = valor.substring(posicao, nextpos).trim();
				mytext = mytext.replaceAll('<br>', ''); //altera o <br> para ENTER (quebra de linha no mersmo texto)
//				var group = document.getElementById('selectMygroup').value.trim();
	
//	alert('mycode='+mycode + '\n myorder='+myorder + '\n group='+group + '\n myrepeated='+myrepeated + '\n mytext='+mytext);
				setStudentFromImport(mycode, myorder, mygroup, mytext, mycorrect1, mycorrect2, mycorrect3, mycorrect4, myincorrect1, myincorrect2, myincorrect3, myincorrect4);
				
				var studentId = $('form').attr('data-student-id');
				addStudentImport(studentId);
				
				var mycode = document.getElementById('mycode').value;
				var myorder = document.getElementById('myorder').value;
				var mygroup = document.getElementById('mygroup').value;
				var mytext = document.getElementById('mytext').value.trim();
				setTimeout(() => { refreshTableData(mycode, myorder, mygroup, mytext) }, 500); // Executa novamente a cada 500 milisegundos
				
				showGridAndHideForms();
				myorder = myorder+1;
				if (nextpos <= 0) {
					//alert('BREAK, nextpos<=0 =' + nextpos);
					posicao = valor.length +1; //força gravar último registro e encerrar
				}
				posicao = nextpos+1;
			}
			document.getElementById('divcontent').style.display='none';
			$('#txtSearch').focus();
			$('#txtSearch').select();
		} catch (ex) {
			alert('erro \n\n\n' + ex.message + '\n\n\n' + mytext);
		}
//	}
}

//This function confirm import
async function confirmImportManual(mycode, myorder, mygroup, mytext, mycorrect1, mycorrect2, mycorrect3, mycorrect4, myincorrect1, myincorrect2, myincorrect3, myincorrect4) {
		try {
			
//alert('mycode='+mycode + ' myorder='+myorder + ' mygroup='+mygroup + ' mytext='+mytext + ' mycorrect1='+mycorrect1 + ' myincorrect1='+myincorrect1);
				
				setStudentFromImport(mycode, myorder, mygroup, mytext, mycorrect1, mycorrect2, mycorrect3, mycorrect4, myincorrect1, myincorrect2, myincorrect3, myincorrect4);

				var studentId = $('form').attr('data-student-id');
				addStudentImport(studentId);
				
				var mycode = document.getElementById('mycode').value;
				var myorder = document.getElementById('myorder').value;
				var mygroup = document.getElementById('mygroup').value;
				var mytext = document.getElementById('mytext').value.trim();
				setTimeout(() => { refreshTableData(mycode, myorder, mygroup, mytext) }, 500); // Executa novamente a cada 500 milisegundos
				
				showGridAndHideForms();
			document.getElementById('divcontent').style.display='none';
			$('#txtSearch').focus();
			$('#txtSearch').select();
		} catch (ex) {
			alert('erro \n\n\n' + ex.message + '\n\n\n' + mytext);
		}
}

//This function refreshes the table
async function refreshTableData(mycode, myorder, mygroup, mytext) {
    try {
		if (mygroup != '' && mycode != '') {
			var students = await jsstoreCon.select({
				from: 'Student'
					, where: { mycode: mycode
					, mygroup: mygroup
				}
				, order: [ {by: 'mygroup'}, {by: 'mycode'} ]
			});
		}

		if (mygroup != '' && mycode == '') {
			var students = await jsstoreCon.select({
				from: 'Student'
					, where: { mygroup: '' + mygroup + ''
				}
				, order: [ {by: 'mygroup'}, {by: 'mycode'} ]
			});
		}

		if (mygroup == '' && mycode != '') {
			var students = await jsstoreCon.select({
				from: 'Student'
					, where: { mycode: '' + mycode + ''
				}
				, order: [ {by: 'mygroup'}, {by: 'mycode'} ]
			});
		}

		var htmlString = "";
		var varTdTh = '';
		var varPlay = '';
		var varEdit = '';
		var varDel = '';
		var htmlStringButtons = ""; //getButtonsBar();

		students.forEach(function (student) {
			if (student.mycode == '0') {
				varTdTh = 'th';
				varPlay = "<a href=\"#\" class=\"playsim\" style=\"color:#00FF00;\">Start</a>";
				varEdit = "&nbsp;<a href=\"#\" class=\"edit\" style=\"color:#0000FF;\">Edit</a>";
                varDel = "&nbsp;<a href=\"#\" class=\"delete\" style=\"color:#FF0000;\">Del</a>";
			} else {
				varTdTh = 'td';
				varPlay = "<a href=\"#\" class=\"playsim\"><i class=\"fa fa-play\" style=\"color:#00FF00;\"></i></a>";
				varEdit = "<a href=\"#\" class=\"edit\"><i class=\"fa fa-edit\" style=\"color:#0000FF;\"></i></a>";
                varDel = "<a href=\"#\" class=\"delete\" style=\"color:#ff0000;\"><i class=\"fa fa-times\" style=\"color:#FF0000;\"></i></a>";
			}
			
			htmlString += "<tr ItemId=" + student.id + ">"
				+ "<td style=\"color:#777777; font-size:12px; \">" + student.mygroup + "</td>"
                + "<td style=\"color:#777777; font-size:12px;\">" + student.mycode + "</td>"
				+ "<" + varTdTh + " id=datashow" + student.id+"3" + " tabIndex=" + student.id+"3" + " ZZZonClick=\"datashow('" + student.id+"3" + "', 3, '" + student.mycode + "');\" onkeyup=\"moveCursor('" + student.mycode + "', 3, event, " + "" + (student.id+"3") + ");\" data-show='" + student.id+"3" + "'>"
				+ student.mytext + "</" + varTdTh + ">"
				
				+ "<" + varTdTh + " id=datashow" + student.id+"4" + " tabIndex=" + student.id+"4" + " ZZZonClick=\"datashow('" + student.id+"4" + "', 4, '" + student.mycode + "');\" onkeyup=\"moveCursor('" + student.mycode + "', 4, event, " + "" + (student.id+"4") + ");\" data-show='" + student.id+"4" + "'>"
				+ varPlay + "</" + varTdTh + ">"
				
				+ "<" + varTdTh + " id=datashow" + student.id+"5" + " tabIndex=" + student.id+"5" + " ZZZonClick=\"datashow('" + student.id+"5" + "', 5, '" + student.mycode + "');\" onkeyup=\"moveCursor('" + student.mycode + "', 5, event, " + "" + (student.id+"5") + ");\" data-show='" + student.id+"5" + "'>"
				+ varEdit + "</" + varTdTh + ">"
				
				+ "<" + varTdTh + " id=datashow" + student.id+"6" + " tabIndex=" + student.id+"6" + " ZZZonClick=\"datashow('" + student.id+"6" + "', 6, '" + student.mycode + "');\" onkeyup=\"moveCursor('" + student.mycode + "', 6, event, " + "" + (student.id+"6") + ");\" data-show='" + student.id+"6" + "'>"
				+ varDel + "</" + varTdTh + ">"
				;
		})

		if (htmlString.length > 0) {
			htmlString += "</tr>"
		} else {
			htmlString += htmlStringButtons

			const d = new Date();
			htmlString += "<b>"
			htmlString += "Não Encontrado"
			htmlString += "<br><br>Pesquise Novamente"
			htmlString += "<br><br>"
			htmlString += d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds();
			htmlString += "</b>"

		}
        $('#tblGrid tbody').html(htmlString);
    } catch (ex) {
        alert(ex.message)
    }
}

//This function refreshes the table
async function selectCountAll() {
    try {
        var htmlString = "";
		//select groupby mycode
		var students = await jsstoreCon.select({
            from: 'Student'
		  , groupBy: "mycode"
			,order: [{
				by: 'mycode',
			}, {
				by: 'myorder'
			}]
		});
		var aux=0;
		students.forEach(function (student) {
			aux=aux+1;
		})
		htmlString += "<td colspan=99>" + aux + " itens</td>"
        $('#tblGrid tbody').html(htmlString);
		document.getElementById('txtSearch').value = aux + " itens";
    } catch (ex) {
        alert(ex.message)
    }
}

async function addStudentImport(studentId) {
    var student = getStudentFromForm(studentId);
    try {

		var noOfDataInserted = await jsstoreCon.insert({
			into: 'Student',
			values: [student]
		});
//		alert('Salvo com sucesso: \n\n Número='+student.mycode + '\n Ordem='+student.myorder + '\n Grupo='+student.mygroup + '\n Pergunta='+student.mytext + '\n'+student.mycorrect1 + '\n'+student.mycorrect2 + '\n'+student.mycorrect3 + '\n'+student.mycorrect4);
		if (noOfDataInserted === 1) {
			var mycode = document.getElementById('mycode').value;
			var myorder = document.getElementById('myorder').value;
			var mygroup = document.getElementById('mygroup').value;
			var mytext = document.getElementById('mytext').value.trim();
			refreshTableData(mycode, myorder, mygroup, mytext);
			showGridAndHideForms();
		}
    } catch (ex) {
        alert(ex.message + ' error ' + student.text);
    }
}

async function updateStudentPlay(studentId) {
    var student = getStudentFromFormPlay(studentId);
	try {
		var noOfDataUpdated = await jsstoreCon.update({
			in: 'Student',
			set: {
				mycorrect1answer: student.mycorrect1answer,
				mycorrect2answer: student.mycorrect2answer,
				mycorrect3answer: student.mycorrect3answer,
				mycorrect4answer: student.mycorrect4answer,
				myincorrect1answer: student.myincorrect1answer,
				myincorrect2answer: student.myincorrect2answer,
				myincorrect3answer: student.myincorrect3answer,
				myincorrect4answer: student.myincorrect4answer
			},
			where: {
				id: student.id
			}
		});
    } catch (ex) {
        alert(ex.message);
    }
}

async function updateStudent(studentId) {
    var student = getStudentFromForm(studentId);
	try {
		var noOfDataUpdated = await jsstoreCon.update({
			in: 'Student',
			set: {
				mygroup: student.mygroup,
				mycode: student.mycode,
				mytext: student.mytext,
				myorder: student.myorder,
				mysearch: student.mysearch,
				mycorrect1: student.mycorrect1,
				mycorrect2: student.mycorrect2,
				mycorrect3: student.mycorrect3,
				mycorrect4: student.mycorrect4,
				myincorrect1: student.myincorrect1,
				myincorrect2: student.myincorrect2,
				myincorrect3: student.myincorrect3,
				myincorrect4: student.myincorrect4
			},
			where: {
				id: student.id
			}
		});
        console.log(`data updated ${noOfDataUpdated}`);
        showGridAndHideForms();
        $('form').attr('data-student-id', null);
		var mygroup = document.getElementById('mygroup').value;
		var mycode = '';
		var mytext = '';
		var myorder = '';
		refreshTableData(mycode, myorder, mygroup, mytext);
        refreshFormData({});
    } catch (ex) {
        alert(ex.message);
    }
}

async function deleteStudent(id) {
    try {
		var noOfStudentRemoved = await jsstoreCon.remove({
			from: 'Student',
			where: {
				id: id
			}
		});
        console.log(`${noOfStudentRemoved} students removed`);
		var mycode = document.getElementById('mycode').value;
		var myorder = document.getElementById('myorder').value;
		var mygroup = document.getElementById('mygroup').value;
		var mytext = document.getElementById('mytext').value.trim();
		refreshTableData(mycode, myorder, mygroup, mytext);
    } catch (ex) {
        alert(ex.message);
    }
}

function getButtonsBar() {
	var htmlStringButtons = '';
	if (localStorage.getItem('valueLogoBig') == 'true') {
		htmlStringButtons += "<a href='#' class='logo'><button id=\"btnLogoTop\" class=\"btn btn-success\"><i class=\"fa fa-minus\"></i> Logo</button></a>"
	} else if (localStorage.getItem('valueLogoBig') == 'false') {
		htmlStringButtons += "<a href='#' class='logo'><button id=\"btnLogoTop\" class=\"btn btn-success\"><i class=\"fa fa-times\"></i> Logo</button></a>"
	} else if (localStorage.getItem('valueLogoBig') == '') {
		htmlStringButtons += "<a href='#' class='logo'><button id=\"btnLogoTop\" class=\"btn btn-success\"><i class=\"fa fa-plus\"></i> Logo</button></a>"
	}
	if (localStorage.getItem('valueAoVivo') == 'true') {
		htmlStringButtons += "&nbsp;<a href='#' class='freeze'><button id=\"btnFreezeTop\" class=\"btn btn-success\"><i class=\"fa fa-lock\"></i> Congela</button></a>"
	} else {
		htmlStringButtons += "&nbsp;<a href='#' class='freeze'><button id=\"btnFreezeTop\" class=\"btn btn-danger\">Ao Vivo</button></a>"
	}
	if (localStorage.getItem('valueComplete') == 'true') {
		htmlStringButtons += "&nbsp;<a href='#' class='complete'><button id=\"btnCompleteTop\" class=\"btn btn-default\"><i class=\"fa fa-minus\"></i></button></a>"
	} else {
		htmlStringButtons += "&nbsp;<a href='#' class='complete'><button id=\"btnCompleteTop\" class=\"btn btn-warning\"><i class=\"fa fa-list\"></i></button></a>"
	}
	if (localStorage.getItem('valueVideoPlay') == 'true') {
		htmlStringButtons += "&nbsp;<a href='#' class='videoplaypause'><button id=\"btnVideoPlayTop\" class=\"btn btn-default\"><i class=\"fa fa-pause\"></i></button></a>"
	} else {
		htmlStringButtons += "&nbsp;<a href='#' class='videoplaypause'><button id=\"btnVideoPlayTop\" class=\"btn btn-primary\"><i class=\"fa fa-play\"></i></button></a>"
	}
	return htmlStringButtons;
}

function getStudentFromFormPlay(studentId) {
	var chkMycorrect1answer = '';
	var chkMycorrect2answer = '';
	var chkMycorrect3answer = '';
	var chkMycorrect4answer = '';
	if (document.getElementById('chkMycorrect1answer') != null) {
		if (document.getElementById('chkMycorrect1answer').checked == true) {
			chkMycorrect1answer = 'checked';
		}
	}
	if (document.getElementById('chkMycorrect2answer') != null) {
		if (document.getElementById('chkMycorrect2answer').checked == true) {
			chkMycorrect2answer = 'checked';
		}
	}
	if (document.getElementById('chkMycorrect3answer') != null) {
		if (document.getElementById('chkMycorrect3answer').checked == true) {
			chkMycorrect3answer = 'checked';
		}
	}
	if (document.getElementById('chkMycorrect4answer') != null) {
		if (document.getElementById('chkMycorrect4answer').checked == true) {
			chkMycorrect4answer = 'checked';
		}
	}

	var chkMyincorrect1answer = '';
	var chkMyincorrect2answer = '';
	var chkMyincorrect3answer = '';
	var chkMyincorrect4answer = '';
	if (document.getElementById('chkMyincorrect1answer') != null) {
		if (document.getElementById('chkMyincorrect1answer').checked == true) {
			chkMyincorrect1answer = 'checked';
		}
	}
	if (document.getElementById('chkMyincorrect2answer') != null) {
		if (document.getElementById('chkMyincorrect2answer').checked == true) {
			chkMyincorrect2answer = 'checked';
		}
	}
	if (document.getElementById('chkMyincorrect3answer') != null) {
		if (document.getElementById('chkMyincorrect3answer').checked == true) {
			chkMyincorrect3answer = 'checked';
		}
	}
	if (document.getElementById('chkMyincorrect4answer') != null) {
		if (document.getElementById('chkMyincorrect4answer').checked == true) {
			chkMyincorrect4answer = 'checked';
		}
	}
/*
alert('chkMycorrect1answer=' + chkMycorrect1answer);
alert('chkMycorrect2answer=' + chkMycorrect2answer);
alert('chkMycorrect3answer=' + chkMycorrect3answer);
alert('chkMycorrect4answer=' + chkMycorrect4answer);
alert('chkMyincorrect1answer=' + chkMyincorrect1answer);
alert('chkMyincorrect2answer=' + chkMyincorrect2answer);
alert('chkMyincorrect3answer=' + chkMyincorrect3answer);
alert('chkMyincorrect4answer=' + chkMyincorrect4answer);
*/
	var student = {
        id: Number(studentId),
		mygroup: $('#mygroup').val(),
        mycode: $('#mycode').val(),
		mycorrect1answer: chkMycorrect1answer,
		mycorrect2answer: chkMycorrect2answer,
		mycorrect3answer: chkMycorrect3answer,
		mycorrect4answer: chkMycorrect4answer,
		myincorrect1answer: chkMyincorrect1answer,
		myincorrect2answer: chkMyincorrect2answer,
		myincorrect3answer: chkMyincorrect3answer,
		myincorrect4answer: chkMyincorrect4answer
    };
	return student;
}

function getStudentFromForm(studentId) {
	var myorderFormated = '';
	myorderFormated = '000' + $('#myorder').val();
	myorderFormated = myorderFormated.substring(myorderFormated.length-3, myorderFormated.length);
	var student = {
        id: Number(studentId),
        mycode: $('#mycode').val(),
		myorder: myorderFormated,
		mygroup: $('#mygroup').val(),
        mytext: $('#mytext').val(),
		mysearch: removeSpecials($('#mytext').val()),
		mycorrect1: $('#mycorrect1').val(),
		mycorrect2: $('#mycorrect2').val(),
		mycorrect3: $('#mycorrect3').val(),
		mycorrect4: $('#mycorrect4').val(),
		myincorrect1: $('#myincorrect1').val(),
		myincorrect2: $('#myincorrect2').val(),
		myincorrect3: $('#myincorrect3').val(),
		myincorrect4: $('#myincorrect4').val()
    };
    return student;
}

function setStudentFromImport(mycode, myorder, mygroup, mytext, mycorrect1, mycorrect2, mycorrect3, mycorrect4, myincorrect1, myincorrect2, myincorrect3, myincorrect4) {
	document.getElementById('mygroup').value = mygroup;
	document.getElementById('mycode').value = mycode;
	document.getElementById('myorder').value = myorder;
	document.getElementById('mytext').value = mytext;
	document.getElementById('mycorrect1').value = mycorrect1;
	document.getElementById('mycorrect2').value = mycorrect2;
	document.getElementById('mycorrect3').value = mycorrect3;
	document.getElementById('mycorrect4').value = mycorrect4;
	document.getElementById('myincorrect1').value = myincorrect1;
	document.getElementById('myincorrect2').value = myincorrect2;
	document.getElementById('myincorrect3').value = myincorrect3;
	document.getElementById('myincorrect4').value = myincorrect4;
    $('#divFormAddUpdate').show();
}

function showFormSim() {
    $('#tblGrid').hide();
    $('#divFormAddUpdate').hide();
	$('#divGear').hide();
	$('#divcontent').hide();
	$('#formBible').hide();
	$('#divconfig').hide();
	$('#divGearAddNewLiryc').hide();
	$('#divFormSim').show();
}

function showFormAddUpdate() {
    $('#tblGrid').hide();
    $('#divFormAddUpdate').show();
	$('#divGear').hide();
	$('#divcontent').hide();
	$('#formBible').hide();
	$('#divconfig').hide();
	$('#divGearAddNewLiryc').hide();
	$('#divFormSim').hide();
}

function showGridAndHideForms() {
    $('#tblGrid').show();
    $('#divFormAddUpdate').hide();
	$('#divGear').hide();
	$('#divcontent').hide();
	$('#formBible').hide();
	$('#divconfig').hide();
	$('#divGearAddNewLiryc').hide();
	$('#divFormSim').hide();
}

function showAddNewManual() {
	$('#divGearAddNewLiryc').show();
    $('#tblGrid').hide();
    $('#divFormAddUpdate').hide();
	$('#divGear').hide();
	$('#divcontent').hide();
	$('#formBible').hide();
	$('#divconfig').hide();
	$('#divFormSim').hide();
}

function showFormGear() {
    $('#tblGrid').hide();
    $('#divFormAddUpdate').hide();
	$('#divGear').show();
	$('#divcontent').hide();
	$('#formBible').hide();
	$('#divconfig').hide();
	$('#divGearAddNewLiryc').hide();
	$('#divFormSim').hide();
}

function showFormImport() {
    $('#tblGrid').hide();
    $('#divFormAddUpdate').hide();
	$('#divGear').hide();
	$('#divcontent').show();
	$('#formBible').hide();
	$('#divconfig').hide();
	$('#divGearAddNewLiryc').hide();
	$('#divFormSim').hide();
}

function showBible() {
    $('#tblGrid').hide();
    $('#divFormAddUpdate').hide();
	$('#divGear').hide();
	$('#divcontent').hide();
	$('#formBible').show();
	$('#divconfig').hide();
	$('#divGearAddNewLiryc').hide();
	$('#divFormSim').hide();
}

function showIniciarConfiguracao() {
    $('#tblGrid').hide();
    $('#divFormAddUpdate').hide();
	$('#divGear').hide();
	$('#divcontent').hide();
	$('#formBible').hide();
	$('#divconfig').show();
	$('#divGearAddNewLiryc').hide();
	$('#divFormSim').hide();
}

function showForm1Form2() {
	openOwner(document.getElementById('config_myowner').value);
	openLogo('logo/logo.png');
	openImagemFundo(localStorage.getItem('valuePlanoFundoMestre'));
}

function openOwner(owner) {
	localStorage.setItem('valueOwner', owner);
}

function openLogo(logo) {
	localStorage.setItem('valueLogo', logo);
}

function openImagemFundo(filename) {
    try {
		//var extensao = filename.toLowerCase().substring((filename.length-3), filename.length);
		localStorage.setItem('valuePlanoFundoMestre', filename);
    } catch (ex) {
        alert(ex.message);
    }
}

function refreshFormData(student) {
    $('form').attr('data-student-id', student.id);
    $('#mygroup').val(student.mygroup);
    $('#mycode').val(student.mycode);
    $('#myorder').val(student.myorder);
    $('#mytext').val(student.mytext);
    $('#mysearch').val(student.mysearch);
    $('#mycorrect1').val(student.mycorrect1);
    $('#mycorrect2').val(student.mycorrect2);
    $('#mycorrect3').val(student.mycorrect3);
    $('#mycorrect4').val(student.mycorrect4);
    $('#myincorrect1').val(student.myincorrect1);
    $('#myincorrect2').val(student.myincorrect2);
    $('#myincorrect3').val(student.myincorrect3);
    $('#myincorrect4').val(student.myincorrect4);
}

function scrollOverflow(overflow) {
	if (overflow == "hidden") {
		document.body.style.overflow = "";
	} else {
		document.body.style.overflow = "hidden";
	}
}

function removeSpecials(search) {
	//minúsculo
	search = search.toLowerCase();
	//sql
	search = search.replaceAll('\'', '');
	//enter
	search = search.replaceAll('\n', ' ');
	//palavra
	search = search.replaceAll(' pra ', ' para ');
	//search = search.replaceAll('...', '');
	search = search.replaceAll('  ', ' ');
	//agudo
	search = search.replaceAll(',', '');
	search = search.replaceAll('á', 'a');
	search = search.replaceAll('é', 'e');
	search = search.replaceAll('í', 'i');
	search = search.replaceAll('ó', 'o');
	search = search.replaceAll('ú', 'u');
	search = search.replaceAll('ý', 'y');
	//crase
	search = search.replaceAll('à', 'a');
	search = search.replaceAll('è', 'e');
	search = search.replaceAll('ì', 'i');
	search = search.replaceAll('ò', 'o');
	search = search.replaceAll('ù', 'u');
	//circunflexo
	search = search.replaceAll('â', 'a');
	search = search.replaceAll('ê', 'e');
	search = search.replaceAll('î', 'i');
	search = search.replaceAll('ô', 'o');
	search = search.replaceAll('û', 'u');
	//trema
	search = search.replaceAll('ä', 'a');
	search = search.replaceAll('ë', 'e');
	search = search.replaceAll('ï', 'i');
	search = search.replaceAll('ö', 'o');
	search = search.replaceAll('ï', 'u');
	search = search.replaceAll('ÿ', 'y');
	//til
	search = search.replaceAll('ã', 'a');
	search = search.replaceAll('õ', 'o');
	search = search.replaceAll('ñ', 'n');
	//subscrito
	search = search.replaceAll('ª', 'a');
	search = search.replaceAll('º', 'o');	
	//especial
	search = search.replaceAll('(', '');
	search = search.replaceAll(')', '');
	search = search.replaceAll('-', ' ');
	search = search.replaceAll('ç', 'c');
	search = search.replaceAll('!', '');
	search = search.replaceAll('?', '');
	search = search.replaceAll('@', '');
	search = search.replaceAll(',', '');
	search = search.replaceAll(':', '');
	search = search.replaceAll('~', ' ');
	search = search.replaceAll('¨', '');
	search = search.replaceAll('^', '');
	search = search.replaceAll('“', '');
	search = search.replaceAll('”', '');
	//alt+code
	search = search.replaceAll('¿', ''); //ALT+168
	search = search.replaceAll('"', ''); //ALT+34
	search = search.replaceAll('#', ''); //ALT+35
	search = search.replaceAll('$', ''); //ALT+36
	search = search.replaceAll('%', ''); //ALT+37
	search = search.replaceAll('&', 'e'); //ALT+38
	search = search.replaceAll('*', ''); //ALT+42
	//vogais
	search = search.replaceAll(' a ', ' ');
	search = search.replaceAll(' e ', ' ');
	search = search.replaceAll(' i ', ' ');
	search = search.replaceAll(' o ', ' ');
	search = search.replaceAll(' u ', ' ');

	return search;
}

function removeEspecialsCommands(valueText) {
	if (valueText.substring(0, 1) == '#' 
	 || valueText.substring(0, 3).toLowerCase() == 'off'
	 || valueText.substring(0, 3).toLowerCase() == 'del'
	 || valueText.substring(0, 4).toLowerCase() == 'edit') { //comando # no campo Search não precisa ser exibido
		valueText = '';
	} else {
		var posIni = '0';
		var posFim = '0';
		var valor = '';
		for (var index=0; index<=valueText.length; index++) {
			posIni = valueText.indexOf('<', posIni);
			posFim = valueText.indexOf('>', posIni);
			posFim = posFim+1;
			if (posIni<0 || posFim<0) {
				index = valueText.length+1;
			} else {
				var find = valueText.substring(posIni, posFim);
				valueText = valueText.replaceAll(find, '');
			}
			posIni = -1;
			posFim = -1;
		}
		valueText = valueText.replaceAll('<', ''); //garante que não sobrou comandos no texto
		valueText = valueText.replaceAll('&nbsp;', '');
		valueText = valueText.replaceAll('&amp;', '&');
	}
	return valueText;
}

function clickElem(elem) {
	var eventMouse = document.createEvent("MouseEvents")
	eventMouse.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
	elem.dispatchEvent(eventMouse)
}
function openFile(func, content) {
	readFile = function(e) {
		var file = e.target.files[0];
		//alert(file.name);
		if (!file) {
			document.getElementById(content).style.display='none';
			return;
		}
		showFormImport();
		document.getElementById(content).style.display='block';
		var reader = new FileReader();
		reader.onload = function(e
		) {
			var contents = e.target.result;
			fileInput.func(contents)
			document.body.removeChild(fileInput)
		}
		reader.readAsText(file)
	}
	fileInput = document.createElement("input")
	fileInput.type='file'
	fileInput.style.display='none'
	fileInput.onchange=readFile
	fileInput.func=func
	document.body.appendChild(fileInput)
	clickElem(fileInput)
	
}
function dispFile(contents) {
	document.getElementById('contents').innerHTML=contents;
}

function moveCursor(mycode, col, evento, index) {
	if (evento.keyCode == 13 || event.which == 13) { //ENTER
		if (col == COL_LOGOTIPO) { //coluna logotipo
			showLogo();
		} else {
			freezeDataShow('false');
			if (localStorage.getItem('valueAoVivo') == 'true') {
				setColor(index, localStorage.getItem('valueAoVivo'));
			}
			document.getElementById('txtSearch').value = removeSpecials(index.trim());
			var mycode = document.getElementById('mycode').value;
			var myorder = document.getElementById('myorder').value;
			var mygroup = document.getElementById('mygroup').value;
			var mytext = document.getElementById('mytext').value.trim();
			refreshTableData(mycode, myorder, mygroup, mytext);
		}
    } else if (evento.keyCode == 27 || event.which == 27) { //ESC
		if (localStorage.getItem('valueAoVivo') == 'false') {
			$('#txtSearch').focus();
			$('#txtSearch').select();
		} else {
			freezeDataShow('true');
			setColor(index, localStorage.getItem('valueAoVivo'));
		}
    }

	var nextTabIndex = 0;
	if (evento.keyCode == 38 || event.which == 38
	 || evento.keyCode == 40 || event.which == 40
	 || evento.keyCode == 39 || event.which == 39
	 || evento.keyCode == 37 || event.which == 37) {
		if (evento.keyCode == 38 || event.which == 38) { //seta para cima
			nextTabIndex = parseInt(index) - parseInt(10);
		} else if (evento.keyCode == 40 || event.which == 40) { //seta para baixo
			nextTabIndex = parseInt(index) + parseInt(10);
		} else if (evento.keyCode == 39 || event.which == 39) { //seta para direita
			nextTabIndex = parseInt(index) + parseInt(1);
			col = col + 1;
		} else if (evento.keyCode == 37 || event.which == 37) { //seta para esquerda
			nextTabIndex = parseInt(index) - parseInt(1);
			col = col - 1;
		}
		datashow(nextTabIndex, col, mycode);
	}
}

//https://www.ti-enxame.com/pt/jquery/use-setas-para-navegar-em-uma-tabela-html/1046534083/
function datashow(index, col, code) {
//alert(document.getElementById('datashow' + index).innerHTML);
	if (document.getElementById('datashow' + index) == null) { //não permite mover o foco para fora da tabela e dar erro de código
		return;
	}
	document.getElementById('datashow' + index).focus;
	if (col != COL_LOGOTIPO) { //logotipo
		var valueText = removeEspecialsCommands(document.getElementById('datashow' + index).innerHTML);
		localStorage.setItem('valueText', valueText);
		setCookie('valueText', valueText, '1');
		//Com o click, seleciona apenas uma letra da lista de pesquida
		if (document.getElementById('txtSearch').value != removeSpecials(code.trim())) {
			document.getElementById('txtSearch').value = removeSpecials(code.trim());
			var mycode = document.getElementById('mycode').value;
			var myorder = document.getElementById('myorder').value;
			var mygroup = document.getElementById('mygroup').value;
			var mytext = document.getElementById('mytext').value.trim();
			refreshTableData(mycode, myorder, mygroup, mytext);
		}
		localStorage.setItem('valueAutor', ' ');
		if (localStorage.getItem('valueArt') == '2') {
			setPlanoFundo();
		}
	}
	
	var startElement = document.getElementById('datashow' + index);
	var indexBefore = localStorage.getItem('valueIndexBefore');
	if (document.getElementById('datashow' + indexBefore) != null) {
		startElement = document.getElementById('datashow' + indexBefore);
	}
	localStorage.setItem('valueIndexBefore', index);
	
	var nextCol = parseInt(col);
	var nextTabIndex = parseInt(index);
	var indexAutor = parseInt(indexAutor);
	indexAutor = document.getElementById('datashow' + index).dataset.show;

	// limpa cor da célula atual
	startElement.style.backgroundColor = '';
	startElement.style.color = '';
	// pinta cor da próxima célula atual
	setColor(nextTabIndex, localStorage.getItem('valueAoVivo'));
//	console.log('startElement=' + startElement + ', nextCol=' + nextCol + ', nextTabIndex=' + nextTabIndex + ', indexAutor=' + indexAutor);
}

//pinta cor da próxima célula atual
function setColor(index, valueAoVivo) {
	var nextcell = document.getElementById('datashow' + index);
	nextcell.focus();
	if (valueAoVivo == 'true') {
		nextcell.style.backgroundColor = '#5cb85c'; //'#5cb85c'; '#5bc0de';
		nextcell.style.color = 'white';
	} else {
		nextcell.style.backgroundColor = '#D22222'; //'#5bc0de; #5cb85c';
		nextcell.style.color = 'white';
	}
}

function chooseBook(content) {
	document.getElementById('txtSearch').value = content;
}

function chooseChapter(content) {
	if (document.getElementById('txtSearch').value.length = 2) {
		var sizeSearch = document.getElementById('txtSearch').value.length;
		document.getElementById('txtSearch').value = document.getElementById('txtSearch').value.substring(0, sizeSearch) + content + ';';
		var mycode = document.getElementById('mycode').value;
		var myorder = document.getElementById('myorder').value;
		var mygroup = document.getElementById('mygroup').value;
		var mytext = document.getElementById('mytext').value.trim();
		refreshTableData(mycode, myorder, mygroup, mytext);
		if (document.getElementById('txtSearch').value.length <= 1) { // pesquisa somente com mais de 1 caracter preenchido no campo search
			if (document.getElementById('selectMygroup').selectedIndex == '1') {
				showBible();
			}
		} else {
			showGridAndHideForms();
		}
		$('#txtSearch').focus();
		$('#txtSearch').select();	
	}
}

function setPlanoFundo() {
	localStorage.setItem('valuePlanoFundoMestre', localStorage.getItem('valueText'));
	setCookie('valuePlanoFundoMestre', localStorage.getItem('valueText'), '1');
}

function aoClicar(endereco) {
	var DataShow_Link = window.open(endereco, "datashowlink");
}

function desceJanela() {
	window.moveTo(100, 100);
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
