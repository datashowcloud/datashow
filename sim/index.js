

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
//	loadMygroup('selectMygroup');
	loadCombobox('mygroup', '0', '100', 'Teste');
	loadCombobox('mycode', '0', '100', 'Número');
	loadCombobox('myorder', '0', '100', 'Ordem');

	refreshLinkHelp();

//	showForm1Form2();
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
			myoption1: { Null: false, dataType: 'string' }, //texto da resposta correta 1
			myoption2: { Null: false, dataType: 'string' }, //texto da resposta correta 2
			myoption3: { Null: false, dataType: 'string' }, //texto da resposta correta 3
			myoption4: { Null: false, dataType: 'string' }, //texto da resposta correta 4
			myoption5: { Null: false, dataType: 'string' }, //texto da resposta errada 1
			myoption6: { Null: false, dataType: 'string' }, //texto da resposta errada 2
			myoption7: { Null: false, dataType: 'string' }, //texto da resposta errada 3
			myoption8: { Null: false, dataType: 'string' }, //texto da resposta errada 4
			myorder: { Null: true, dataType: 'string' }, //ordem de exibição das respostas para uma determinada pergunta
			mycorrect1answer1: { Null: false, dataType: 'string' }, //resposta selecionada pelo usuário
			mycorrect2answer: { Null: false, dataType: 'string' }, //idem
			mycorrect3answer: { Null: false, dataType: 'string' }, //idem
			mycorrect4answer: { Null: false, dataType: 'string' }, //idem
			mycorrect5answer: { Null: false, dataType: 'string' }, //idem
			mycorrect6answer: { Null: false, dataType: 'string' }, //idem
			mycorrect7answer: { Null: false, dataType: 'string' }, //idem
			mycorrect8answer: { Null: false, dataType: 'string' }, //idem
			myoptionkey1: { Null: false, dataType: 'string' }, //chave da resposta correta para pesquisar na tabela de respostas com join
			myoptionkey2: { Null: false, dataType: 'string' }, //idem
			myoptionkey3: { Null: false, dataType: 'string' }, //idem
			myoptionkey4: { Null: false, dataType: 'string' }, //idem
			myoptionkey5: { Null: false, dataType: 'string' }, //idem
			myoptionkey6: { Null: false, dataType: 'string' }, //idem
			myoptionkey7: { Null: false, dataType: 'string' }, //idem
			myoptionkey8: { Null: false, dataType: 'string' }, //idem
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
			mycodeHistory: { notNull: true, dataType: 'string' }, //código único
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
/*    $('#btnRefresh').click(function () {
        var result = confirm('Vou limpar e reorganizar as respostas, ok?');
        if (result) {
			var mygroup = document.getElementById('mygroupSim').value;
			updateStudentPlayOrder(mygroup);
			updateStudentPlayClear(mygroup);
			showGridAndHideForms();
        }
		var mygroup = document.getElementById('selectMygroup').value;
		var mycode = '';
		var myorder = '';
		var mytext = '';
		refreshTableData(mycode, myorder, mygroup, mytext);
		showGridAndHideForms();
		$('#selectMygroup').focus();
		$('#selectMygroup').select();
    })
*/
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
	$('#btnBackward').click(function () {
        var result = confirm('Vou limpar e reorganizar todas respostas, ok?');
        if (result) {
			var mygroup = document.getElementById('mygroupSim').value;
			updateStudentPlayOrder(mygroup);
			updateStudentPlayClear(mygroup);
			showGridAndHideForms();
        }
    });
    $('#btnImportSim').click(function () {
		showIniciarConfiguracao();
    })
    $('#btnIndexConfigurar').click(function () {
//		console.log("config" + document.getElementById('selectMygroup').value + ".html?sim=" + document.getElementById('selectMygroup').value);
//		return;
		window.close();
		var DataShow_Config = window.open("config" + document.getElementById('selectMygroup').value + ".html?sim=" + document.getElementById('selectMygroup').value, "datashowconfig", "top=0, width=400, height=200, left=500, location=no, menubar=no, resizable=no, scrollbars=no, status=no, titlebar=no, toolbar=no");
//		var DataShow_ConfigResult = window.open("configresult.html", "datashowconfigresult");
//		datashowconfigresult.focus();
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
				var myoption1 = document.getElementById('myoption1').value.trim();
				var myoption2 = document.getElementById('myoption2').value.trim();
				var myoption3 = document.getElementById('myoption3').value.trim();
				var myoption4 = document.getElementById('myoption4').value.trim();
				var myoption5 = document.getElementById('myoption5').value.trim();
				var myoption6 = document.getElementById('myoption6').value.trim();
				var myoption7 = document.getElementById('myoption7').value.trim();
				var myoption8 = document.getElementById('myoption8').value.trim();
				
//console.log('mycode='+mycode + ' myorder='+myorder + ' mygroup='+mygroup + ' mytext='+mytext + ' myoption1='+myoption1 + ' myoption5='+myoption5);
				
				confirmImportManual(mycode, myorder, mygroup, mytext, myoption1, myoption2, myoption3, myoption4, myoption5, myoption6, myoption7, myoption8);
//				console.log('Clique em "Go back". \nClique em "Go back".');
//				document.getElementById("formAdd").submit();
			} catch (ex) {
				console.log(ex.message);
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
//			console.log(confirmImportSuccessfull);
		} else {
			console.log('Configuração cancelada.');
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
		var mygroup = document.getElementById('mygroupSim').value;
		var mycode = parseInt(document.getElementById('mycodeSim').value) - 1;
		if (studentId) {
			updateStudent(studentId, mygroup, mycode);
		} else {
			addStudentImport(studentId, mygroup, mycode);
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
    $('#btnPlay').click(function () {
		var mygroup = document.getElementById('selectMygroup').value;
		getFromTablePlay('', mygroup, '1');
		showFormSim();
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
		console.log(mysim);
    });
	$('#btnSimulator').click(function () {
		var array = [];
		var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
		for (var i = 0; i < checkboxes.length; i++) {
		  array.push(checkboxes[i].value);
		}
		console.log(array);
    });
    $('#btnPrevious').click(function () {
		var myid = document.getElementById('myidSim').value;
		var mygroup = document.getElementById('mygroupSim').value;
		var mycode = parseInt(document.getElementById('mycodeSim').value) - 1;
		updateStudentPlay(myid, mygroup, mycode);
		getFromTablePlay(myid, mygroup, mycode);
    })
    $('#btnNext').click(function () {
		var myid = document.getElementById('myidSim').value;
		var mygroup = document.getElementById('mygroupSim').value;
		var mycode = parseInt(document.getElementById('mycodeSim').value) + 1;
		updateStudentPlay(myid, mygroup, mycode);
		getFromTablePlay(myid, mygroup, mycode);
    })
	$('#btnPause').click(function () {
		showGridAndHideForms();
    });	
	$('#btnPoints').click(function () {
		var mygroup = document.getElementById('mygroupSim').value;
		var mycode = parseInt(document.getElementById('mycodeSim').value) + 1;
		showPoints(mygroup, mycode);
    });	
	$('#btnGear').click(function () {
		if (document.getElementById('divGear').style.display == 'none') {
			showFormGear();
		} else {
			showGridAndHideForms();
		}
    })
}

function getStudentFromForm(studentId, mygroup, mycode) {
	var mygroup = document.getElementById('mygroupSim').value;
	setTimeout(() => { updateStudentPlayOrder(mygroup) }, 1000); // Executa após 5 segundos para esperar o processo de insert terminar
	var student = {
        id: Number(studentId),
        mycode: $('#mycode').val(),
		mygroup: $('#mygroup').val(),
        mytext: $('#mytext').val(),
		mysearch: removeSpecials($('#mytext').val())
    };
    return student;
}

async function showPoints(mygroup, mycode) {
	var students = await jsstoreCon.select({
		from: 'Student'
		  , where: { mygroup: mygroup 
		  }
	});
	
	var totalCorretas = 0;
	var totalIncorretas = 0;
	var totalNaoRespondidas = 0;

	students.forEach(function (student) {
		if (student.mycode != '0') {
			var ok = '';
			if (student.mycorrect1answer == '' && student.mycorrect2answer == '' && student.mycorrect3answer == '' && student.mycorrect4answer == ''
			 && student.mycorrect5answer == '' && student.mycorrect6answer == '' && student.mycorrect7answer == '' && student.mycorrect8answer == '') {
				ok = '';
			} else {
				for (var index=1; index<=4; index++) {
					if (student.myoption1 != '') {
						if (student.mycorrect1answer != '') { ok = 'true'; }
						if (student.mycorrect1answer == '') { ok = 'false'; break; }
					}
					if (student.myoption2 != '') {
						if (student.mycorrect2answer != '') { ok = 'true'; }
						if (student.mycorrect2answer == '') { ok = 'false'; break; }
					}
					if (student.myoption3 != '') {
						if (student.mycorrect3answer != '') { ok = 'true'; }
						if (student.mycorrect3answer == '') { ok = 'false'; break; }
					}
					if (student.myoption4 != '') {
						if (student.mycorrect4answer != '') { ok = 'true'; }
						if (student.mycorrect4answer == '') { ok = 'false'; break; }
					}
				}
				//resposta incorreta para opções 5, 6, 7 e 8.
				if (student.mycorrect5answer != '') { ok = 'false'; }
				if (student.mycorrect6answer != '') { ok = 'false'; }
				if (student.mycorrect7answer != '') { ok = 'false'; }
				if (student.mycorrect8answer != '') { ok = 'false'; }
			}

			if (ok == 'true') {
				totalCorretas = parseInt(totalCorretas) + 1;
			} else if (ok == 'false') {
				totalIncorretas = parseInt(totalIncorretas) + 1;
			} else if (ok == '') {
				totalNaoRespondidas = parseInt(totalNaoRespondidas) + 1;
			}
		}
	})
	
	totalperguntas = 20;
	var calculo = (totalCorretas*100) / totalperguntas;
	calculo = calculo.toFixed(0);
	var resultado = '';
	resultado = resultado + 'Id: ' + mygroup;
	resultado = resultado + totalIncorretas + ' erradas ';//+ erradas;
	resultado = resultado + '\n\n' + totalCorretas + ' corretas';
	resultado = resultado + '\n\n' + totalNaoRespondidas + ' não respondidas ';// + responder;
//	resultado = resultado + '\n\nResponda: '  + responder;
	
	if (calculo >= 70) {
		resultado = resultado + '\n\n' + 'JÁ ESTÁ APROVADO \n' + calculo + '% de acerto é >= que 70%';
	} else {
		resultado = resultado + '\n\n' + 'AINDA ESTÁ REPROVADO \n' + calculo + '% de acerto é < que 70%';
	}

//	resultado = resultado + '\nDuração: ' + document.getElementById('tempoduracao').value + 'h';

	alert(resultado);
}

//This function select table play
async function getFromTablePlay(id, mygroup, mycode) {
//    try {
		var students = await jsstoreCon.select({
			from: 'Student'
			  , where: { mygroup: '' + mygroup + ''
					   , mycode: '' + mycode + ''
			  }
		});
		students.forEach(function (student) {
			document.getElementById('myorderSim').style.display='none';
			document.getElementById('myidSim').style.display='none';
			document.getElementById('mygroupSim').style.display='none';
			document.getElementById('mycodeSim').style.display='none';

			$('#myidSim').val(student.id);
			$('#mygroupSim').val(student.mygroup);
			$('#mycodeSim').val(student.mycode);
			$('#myorderSim').val(student.myorder);
			
			document.getElementById('mycorrect1Sim').style.display='none';
			document.getElementById('mycorrect2Sim').style.display='none';
			document.getElementById('mycorrect3Sim').style.display='none';
			document.getElementById('mycorrect4Sim').style.display='none';
			document.getElementById('mycorrect5Sim').style.display='none';
			document.getElementById('mycorrect6Sim').style.display='none';
			document.getElementById('mycorrect7Sim').style.display='none';
			document.getElementById('mycorrect8Sim').style.display='none';

			document.getElementById('mytextSim').innerHTML = '<b>' + student.mycode + '. ' + student.mytext + '</b>';

			var myorder = student.myorder;
			myorder = myorder.replaceAll('\,', '');
			for (var index=0; index<=8; index++) {
				valorIndice = myorder.substring(index,index+1);
				if (valorIndice == '1') {
					var aux = ''; var linkhref = '';
					if (document.getElementById(student.myoptionkey1) != null) {
						aux = document.getElementById(student.myoptionkey1).innerHTML;
						linkhref = document.getElementById('link_' + student.myoptionkey1);
					}
					document.getElementById('mycorrect' + parseInt(index+1) + 'answer').innerHTML = 
//					valorIndice +
					' <input onclick="showCorrect(\'' + valorIndice + '\');" id="chkMycorrect' + valorIndice + 'answer" type=checkbox value=' + valorIndice + ' '
					+ student.mycorrect1answer + '> ' + student.myoption1
//					+ ' <a href="#' + student.myoption1 + '" class="btn btn-default"><b>?</b></a>'
					+ ' <zzz id=lblcorrect' + valorIndice + ' style="color:green; display:none"><i class="fa fa-check"></i> <b>correta</b>'
					+ '<p/>' + aux + '</zzz>'
					+ '<br/>(<a href=' + linkhref + ' target="_blank">link internet</a>)';
					if (student.myoption1 != '') {
						document.getElementById('mycorrect' + parseInt(index+1) + 'Sim').style.display='block';
					}
				} else if (valorIndice == '2') {
					var aux = ''; var linkhref = '';
					if (document.getElementById(student.myoptionkey2) != null) {
						aux = document.getElementById(student.myoptionkey2).innerHTML;
						linkhref = document.getElementById('link_' + student.myoptionkey2);
					}
					document.getElementById('mycorrect' + parseInt(index+1) + 'answer').innerHTML = 
//					valorIndice +
					' <input onclick="showCorrect(\'' + valorIndice + '\');" id="chkMycorrect' + valorIndice + 'answer" type=checkbox value=' + valorIndice + ' '
					+ student.mycorrect2answer + '> ' + student.myoption2
//					+ ' <a href="#' + student.myoption2 + '" class="btn btn-default"><b>?</b></a>'
					+ ' <zzz id=lblcorrect' + valorIndice + ' style="color:green; display:none"><i class="fa fa-check"></i> <b>correta</b>'
					+ '<p/>' + aux + '</zzz>'
					+ '<br/>(<a href=' + linkhref + ' target="_blank">link internet</a>)';
					if (student.myoption2 != '') {
						document.getElementById('mycorrect' + parseInt(index+1) + 'Sim').style.display='block';
					}
				} else if (valorIndice == '3') {
					var aux = ''; var linkhref = '';
					if (document.getElementById(student.myoptionkey3) != null) {
						aux = document.getElementById(student.myoptionkey3).innerHTML;
						linkhref = document.getElementById('link_' + student.myoptionkey3);
					}
					document.getElementById('mycorrect' + parseInt(index+1) + 'answer').innerHTML = 
//					valorIndice +
					' <input onclick="showCorrect(\'' + valorIndice + '\');" id="chkMycorrect' + valorIndice + 'answer" type=checkbox value=' + valorIndice + ' '
					+ student.mycorrect3answer + '> ' + student.myoption3
//					+ ' <a href="#' + student.myoption3 + '" class="btn btn-default"><b>?</b></a>'
					+ ' <zzz id=lblcorrect' + valorIndice + ' style="color:green; display:none"><i class="fa fa-check"></i> <b>correta</b>'
					+ '<p/>' + aux + '</zzz>'
					+ '<br/>(<a href=' + linkhref + ' target="_blank">link internet</a>)';
					if (student.myoption3 != '') {
						document.getElementById('mycorrect' + parseInt(index+1) + 'Sim').style.display='block';
					}
				} else if (valorIndice == '4') {
					var aux = ''; var linkhref = '';
					if (document.getElementById(student.myoptionkey4) != null) {
						aux = document.getElementById(student.myoptionkey4).innerHTML;
						linkhref = document.getElementById('link_' + student.myoptionkey4);
					}
					document.getElementById('mycorrect' + parseInt(index+1) + 'answer').innerHTML = 
//					valorIndice +
					' <input onclick="showCorrect(\'' + valorIndice + '\');" id="chkMycorrect' + valorIndice + 'answer" type=checkbox value=' + valorIndice + ' '
					+ student.mycorrect4answer + '> ' + student.myoption4
//					+ ' <a href="#' + student.myoption4 + '" class="btn btn-default"><b>?</b></a>'
					+ ' <zzz id=lblcorrect' + valorIndice + ' style="color:green; display:none"><i class="fa fa-check"></i> <b>correta</b>'
					+ '<p/>' + aux + '</zzz>'
					+ '<br/>(<a href=' + linkhref + ' target="_blank">link internet</a>)';
					if (student.myoption4 != '') {
						document.getElementById('mycorrect' + parseInt(index+1) + 'Sim').style.display='block';
					}
				} else if (valorIndice == '5') {
					var aux = ''; var linkhref = '';
					if (document.getElementById(student.myoptionkey5) != null) {
						aux = document.getElementById(student.myoptionkey5).innerHTML;
						linkhref = document.getElementById('link_' + student.myoptionkey5);
					}
					document.getElementById('mycorrect' + parseInt(index+1) + 'answer').innerHTML = 
//					valorIndice +
					' <input onclick="showCorrect(\'' + valorIndice + '\');" id="chkMycorrect' + valorIndice + 'answer" type=checkbox value=' + valorIndice + ' '
					+ student.mycorrect5answer + '> ' + student.myoption5
//					+ ' <a href="#' + student.myoption5 + '" class="btn btn-default"><b>?</b></a>'
					+ ' <zzz id=lblcorrect' + valorIndice + ' style="color:red; display:none"><i class="fa fa-remove"></i> <b>incorreta</b>'
					+ '<p/>' + aux + '</zzz>'
					+ '<br/>(<a href=' + linkhref + ' target="_blank">link internet</a>)';
					if (student.myoption5 != '') {
						document.getElementById('mycorrect' + parseInt(index+1) + 'Sim').style.display='block';
					}
				} else if (valorIndice == '6') {
					var aux = ''; var linkhref = '';
					if (document.getElementById(student.myoptionkey6) != null) {
						aux = document.getElementById(student.myoptionkey6).innerHTML;
						linkhref = document.getElementById('link_' + student.myoptionkey6);
					}
					document.getElementById('mycorrect' + parseInt(index+1) + 'answer').innerHTML = 
//					valorIndice +
					' <input onclick="showCorrect(\'' + valorIndice + '\');" id="chkMycorrect' + valorIndice + 'answer" type=checkbox value=' + valorIndice + ' '
					+ student.mycorrect6answer + '> ' + student.myoption6
//					+ ' <a href="#' + student.myoption6 + '" class="btn btn-default"><b>?</b></a>'
					+ ' <zzz id=lblcorrect' + valorIndice + ' style="color:red; display:none"><i class="fa fa-remove"></i> <b>incorreta</b>'
					+ '<p/>' + aux + '</zzz>'
					+ '<br/>(<a href=' + linkhref + ' target="_blank">link internet</a>)';
					if (student.myoption6 != '') {
						document.getElementById('mycorrect' + parseInt(index+1) + 'Sim').style.display='block';
					}
				} else if (valorIndice == '7') {
					var aux = ''; var linkhref = '';
					if (document.getElementById(student.myoptionkey7) != null) {
						aux = document.getElementById(student.myoptionkey7).innerHTML;
						linkhref = document.getElementById('link_' + student.myoptionkey7);
					}
					document.getElementById('mycorrect' + parseInt(index+1) + 'answer').innerHTML = 
//					valorIndice +
					' <input onclick="showCorrect(\'' + valorIndice + '\');" id="chkMycorrect' + valorIndice + 'answer" type=checkbox value=' + valorIndice + ' '
					+ student.mycorrect7answer + '> ' + student.myoption7
//					+ ' <a href="#' + student.myoption7 + '" class="btn btn-default"><b>?</b></a>'
					+ ' <zzz id=lblcorrect' + valorIndice + ' style="color:red; display:none"><i class="fa fa-remove"></i> <b>incorreta</b>'
					+ '<p/>' + aux + '</zzz>'
					+ '<br/>(<a href=' + linkhref + ' target="_blank">link internet</a>)';
					if (student.myoption7 != '') {
						document.getElementById('mycorrect' + parseInt(index+1) + 'Sim').style.display='block';
					}
				} else if (valorIndice == '8') {
					var aux = ''; var linkhref = '';
					if (document.getElementById(student.myoptionkey8) != null) {
						aux = document.getElementById(student.myoptionkey8).innerHTML;
						linkhref = document.getElementById('link_' + student.myoptionkey8);
					}
					document.getElementById('mycorrect' + parseInt(index+1) + 'answer').innerHTML = 
//					valorIndice +
					' <input onclick="showCorrect(\'' + valorIndice + '\');" id="chkMycorrect' + valorIndice + 'answer" type=checkbox value=' + valorIndice + ' '
					+ student.mycorrect8answer + '> ' + student.myoption8
//					+ ' <a href="#' + student.myoption8 + '" class="btn btn-default"><b>?</b></a>'
					+ ' <zzz id=lblcorrect' + valorIndice + ' style="color:red; display:none"><i class="fa fa-remove"></i> <b>incorreta</b>'
					+ '<p/>' + aux + '</zzz>'
					+ '<br/>(<a href=' + linkhref + ' target="_blank">link internet</a>)';
					if (student.myoption8 != '') {
						document.getElementById('mycorrect' + parseInt(index+1) + 'Sim').style.display='block';
					}
				}
			}
		})

//		refreshLinkHelp();
		
//    } catch (ex) {
//        console.log(ex.message)
//    }	
}

function getLinkHelp(keylink, hreflink, textlink) {
	var linkhelp = '';
	linkhelp = linkhelp + '<p/><a href="#top" class="btn btn-default"><i class="fa fa-arrow-up"></i></a>';
	linkhelp = linkhelp + '<b> ' + keylink + '</b>';
	linkhelp = linkhelp + '<br/><i id="' + keylink + '" value="' + hreflink + '"> ' + textlink + '</i>';
	linkhelp = linkhelp + '<br/>(<a id="link_' + keylink + '" href=' + hreflink + ' target="_blank">link internet</a>)';

	if (keylink == '') {
		return '';
	} else {
		return linkhelp;
	}
}

async function refreshLinkHelp() {
	var students = await jsstoreCon.select({
		from: 'Student'
		  , where: { mygroup: {like: '00' + ''} 
		  }
	});

	var linkhelp = '<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/> <b>MINHA AJUDA</b> <br/><br/>';
	students.forEach(function (student) {
		linkhelp = linkhelp + getLinkHelp(student.mytext, student.myoption2, student.myoption1); //mytext=key, myoption2=href, myoption1=texto
	})
	linkhelp = linkhelp + '<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>';
	
	document.getElementById('divlinkhelp').innerHTML = linkhelp;
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
		$('#myoption1').val(student.myoption1);
		$('#myoption2').val(student.myoption2);
		$('#myoption3').val(student.myoption3);
		$('#myoption4').val(student.myoption4);
		$('#myoption5').val(student.myoption5);
		$('#myoption6').val(student.myoption6);
		$('#myoption7').val(student.myoption7);
		$('#myoption8').val(student.myoption8);
	})
}

//This function load combobox
async function loadCombobox(name, min, max, text) {
	for (var item=min; item<=max; item++) {
		var option = new Option(text + ' ' + item, item);
		document.getElementById(name).add(option);
	}
}

//This function load combobox
async function loadMygroup(name) {
	var option = new Option('Teste 1.0', '10');
	document.getElementById(name).add(option);
	var option = new Option('Teste 1.1', '11');
	document.getElementById(name).add(option);
	var option = new Option('Teste 1.2', '12');
	document.getElementById(name).add(option);
	var option = new Option('Teste 2.0', '20');
	document.getElementById(name).add(option);
	var option = new Option('Teste 2.1', '21');
	document.getElementById(name).add(option);
	var option = new Option('Teste 2.2', '22');
	document.getElementById(name).add(option);
}

async function clearForm() {
	$('form').attr('data-student-id', null);
	$('#mytext').val('');
	$('#myoption1').val('');
	$('#myoption2').val('');
	$('#myoption3').val('');
	$('#myoption4').val('');
	$('#myoption5').val('');
	$('#myoption6').val('');
	$('#myoption7').val('');
	$('#myoption8').val('');
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
			console.log('successfull');
		}
    } catch (ex) {
        console.log(ex.message);
    }
}

//This function drop database
async function dropdb() {
	var result = confirm('Vou restaurar e limpar tudo, ok?');
	if (result) {
		jsstoreCon.dropDb().then(function() {
			console.log('Db deleted successfully');
			var mycode = document.getElementById('mycode').value;
			var myorder = document.getElementById('myorder').value;
			var mygroup = document.getElementById('mygroup').value;
			var mytext = document.getElementById('mytext').value.trim();
			refreshTableData(mycode, myorder, mygroup, mytext);
//			console.log('successfull');
		}).catch(function(error) {
			console.log(error);
		});;
		showIniciarConfiguracao();
	}
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
//			console.log('Pronto! Fim da configuração.');
		}
		//Resultado
		$('#tblGrid tbody').html(labelStudents + '<br/>' + '<br/>' + buttonFechar);
	} catch (ex) {
        console.log(ex.message)
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
        console.log(ex.message);
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
        console.log(ex.message);
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
        console.log(ex.message);
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
        console.log(ex.message);
    }
}

function onLoadConfig() {
	loadCombobox('mygroup', '0', '200', 'Teste');
	loadCombobox('mycode', '0', '200', 'Número');
	loadCombobox('myorder', '0', '200', 'Ordem');
	confirmImport('contents1', '0');
	importConfigZero();
}

function importConfigZero() {
	return '';
}

function buscaValorTag(valor, key) {	
	var posini = valor.indexOf('<' + key + '>', 0);
	var posfim = valor.indexOf('</' + key + '>', 0);
	var result = valor.substring(posini, posfim).trim();
	result = result.replaceAll('<' + key + '>', '');
	result = result.replaceAll('</' + key + '>', '');
//	alert('posini: '+posini + ' posfim: '+posfim + ' result: ['+result+']');
	return result;
}

function removeTags(valor, key) {
	var posini = valor.indexOf('<' + key + '>', 0);
	var posfim = valor.indexOf('</' + key + '>', 0);
	if (posini == -1 || posfim == -1) {
//		alert('posini: '+posini + ' posfim: '+posfim + ' vazio: ' + valor);
		return valor;
	} else {
		var result = valor.substring(0, posini).trim() + '' + valor.substring(posfim+key.length+3, valor.length).trim();
//		alert('posini: '+posini + ' posfim: '+posfim + ' result: [' + result + ']');
		return result;
	}
}

function getArrayAnswers(valor) {
	var arrayok = []; var arrayKO = [];
	var valorok = ''; var valorKO = '';
	var posicao = 0;
	var index = 0;
	var fim = '';
	nextpos = valor.indexOf('\n\n', posicao);
//	console.log(valor);
	for (index=0; index<=4; index++) {
		var valorkey = '';
		var valorsemkey = '';
		
		var ok = valor.substring(posicao, posicao+5).trim();
//		console.log('ok=' + ok + ' posicao='+posicao + ' nextpos=' + nextpos + ' index=' + index + ' \n\n' + valor.substring(posicao, nextpos).trim());
		
		//ok
		if (ok == '<ok>' ) {
			valorok = valor.substring(posicao, nextpos).replaceAll('<ok>', '');

			valorsemkey = removeTags(valorok, 'key');
			arrayok.push(valorsemkey.trim());
//			alert('valorok_semtag: [' + valorsemkey.trim() + ']');

			valorkey = buscaValorTag(valorok, 'key');
			arrayok.push(valorkey.trim());
//			alert('arrayok: [' + arrayok + ']');
		//KO
		} else {
			valorKO = valor.substring(posicao, nextpos).replaceAll('<ok>', '');

			valorsemkey = removeTags(valorKO, 'key');
			arrayKO.push(valorsemkey.trim());
//			alert('valorKO_semkey: [' + valorsemkey.trim() + ']');

			valorkey = buscaValorTag(valorKO, 'key');
			arrayKO.push(valorkey.trim());
//			alert('array_KO: [' + arrayKO + ']');
		}
		//limpa variáveis
		posicao = nextpos+1;
		nextpos = valor.indexOf('\n\n', posicao);		
		if (fim == 'break') {
//			console.log('fim=break');
			break;
		}
		if (nextpos == -1) {
			fim = 'break';
			//força gravar última e sai
			nextpos = valor.length;
//			console.log('break: posicao='+posicao + ' nextpos=' + nextpos + ' index=' + index + ' \n' + valor.substring(posicao, nextpos).replaceAll('<ok>', ''));
		}
//		console.log(' posicao='+posicao + ' nextpos=' + nextpos + ' index=' + index + ' \n\n' + valor.substring(posicao, nextpos).trim());
//		console.log(valor.substring(posicao, posicao+5).trim());

		valorok = '';
		valorKO = '';
	}
	var array = [];
	//ok
	for (index=0; index<8; index++) {
		if (arrayok[index] == null) {
			array.push(null); //'\'' + '' + '\''
		} else {
			array.push(arrayok[index]);
		}
	}
	//KO
	for (index=0; index<8; index++) {
		if (arrayKO[index] == null) {
			array.push(null); //'\'' + '' + '\''
		} else {
			array.push(arrayKO[index]);
		}
	}
//	alert('array: '+array);
	return array;
}

async function salvarRegistro(mygroup, mycode, myorder, mytext) {
	var posicao=0;
	var nextpos = 0;
	nextpos = mytext.indexOf('\n\n', posicao);
	var question = mytext.substring(posicao, nextpos).replaceAll('<p>', ''); //remove separador <p>
	question = question.substring(posicao, nextpos).trim(); //remove espaços
//	console.log('question='+question);
	var aswers = mytext.substring(nextpos, mytext.length).trim();
//	console.log('aswers= \n'+aswers);
	var array = getArrayAnswers(aswers);

//	alert('setStudentFromImport:\n'+array[0]+', '+array[1] + '\n '+array[2]+', '+array[3] + '\n '+array[4]+', '+array[5] + '\n '+array[6]+', '+array[7] + '\n '+array[8]+', '+array[9] + '\n '+array[10]+', '+array[11] + '\n '+array[12]+', '+array[13] + '\n '+array[14]+', '+array[15]);
//	setStudentFromImport(mygroup, mycode, myorder, question, array[0], array[1], array[2], array[3], array[4], array[5], array[6], array[7]);
	setStudentFromImport(mygroup, mycode, myorder, question, array[0], array[1], array[2], array[3], array[4], array[5], array[6], array[7], array[8], array[9], array[10], array[11], array[12], array[13], array[14], array[15]);
	var studentId = $('form').attr('data-student-id');
	addStudentImportConfig(studentId, mygroup, mycode);
//	setTimeout(() => { updateStudentPlayOrder(mygroup) }, 1000); // Executa após 5 segundos para esperar o processo de insert terminar
}

//This function confirm import
async function confirmImport(contents, group) {
	try {
		var params = new URLSearchParams(window.location.search);
		
//		console.log('params.get(sim) = ' + params.get('sim'));
		var mygroup = params.get('sim');
		var mytext = document.getElementById(contents).value;
		var mycode = 0;
		var myorder = 1;
		var index=0;
		var posicao=0;
		var nextp = 0;
		for (index=0; index<=mytext.length; index++) {
			nextp = mytext.indexOf('<p>', posicao + '<p>'.length);
			if (nextp == -1) {
//				console.log('index break='+index);
				break;
			}
//			console.log(' posicao='+posicao + ' nextp='+nextp + '\n [' + mytext.substring(posicao, nextp) + ']');
			
			var valor = mytext.substring(posicao, nextp);
//			console.log('salvarRegistro: \n [' + '\n mygroup='+mygroup + '\n mycode='+mycode + '\n myorder='+myorder + '\n [' + valor + ']');
			salvarRegistro(mygroup, mycode, myorder, valor);
			
			posicao = nextp;
			mycode = parseInt(mycode) + parseInt(1);
			myorder = parseInt(mycode);
			index = mytext.substring(posicao, nextp).length;
		}
	} catch (ex) {
		console.log('erro \n\n\n' + ex.message + '\n\n\n' + valor);
	}
}

//This function confirm import
async function confirmImportManual(mycode, myorder, mygroup, mytext, myoption1, myoption2, myoption3, myoption4, myoption5, myoption6, myoption7, myoption8) {
		try {
			
//console.log(' mygroup='+mygroup + ' mycode='+mycode + ' myorder='+myorder + ' mytext='+mytext + ' myoption1='+myoption1 + ' myoption5='+myoption5);
				
				setStudentFromImport(mygroup, mycode, myorder, mytext, myoption1, '', myoption2, '', myoption3, '', myoption4, '', myoption5, '', myoption6, '', myoption7, '', myoption8, '');

				var studentId = $('form').attr('data-student-id');
				addStudentImport(studentId, mygroup, mycode);
				
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
			console.log('erro \n\n\n' + ex.message + '\n\n\n' + mytext);
		}
}

//This function refreshes the table
async function refreshTableData(mycode, myorder, mygroup, mytext) {
//    try {
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
		var varText = '';
//		var varPlay = '';
		var varEdit = '';
		var varDel = '';
		var htmlStringButtons = ""; //getButtonsBar();

		students.forEach(function (student) {
			varText = "<a href=\"#\" class=\"playsim\">" + student.mytext + "</a>";
			if (student.mycode == '0') {
				varTdTh = 'th';
//				varPlay = "<a href=\"#\" class=\"playsim\" style=\"color:#00FF00;\">Start</a>";
				varEdit = "&nbsp;<a href=\"#\" class=\"edit\" style=\"color:#0000FF;\">Edit</a>";
                varDel = "&nbsp;<a href=\"#\" class=\"delete\" style=\"color:#FF0000;\">Del</a>";
			} else {
				varTdTh = 'td';
//				varPlay = "<button class=\"playsim\" style=\"color:#00FF00;\"><i class=\"fa fa-play\"></i></button>";
				varEdit = "<button class=\"edit\" style=\"color:#0000FF;\" ><i class=\"fa fa-pencil\"></i></button>";
				varDel = "<button class=\"delete\" style=\"color:#FF0000;\" ><i class=\"fa fa-times\"></i></button>";
/*
//				varPlay = "<a href=\"#\" class=\"playsim\"><i class=\"fa fa-play\" style=\"color:#00FF00; height:25px; Xwidth:25px; \"></i></a>";
				varEdit = "<a href=\"#\" class=\"edit\"><i class=\"fa fa-pencil\" style=\"color:#0000FF; height:25px; Xwidth:25px; \"></i></a>";
				varDel = "<a href=\"#\" class=\"delete\"><i class=\"fa fa-times\" style=\"color:#FF0000; height:25px; Xwidth:25px;\"></i></a>";
*/
			}
			
			htmlString += "<tr ItemId=" + student.id + ">"
				+ "<td style=\"color:#777777; font-size:12px; \">" + student.mygroup + "</td>"
                + "<td style=\"color:#777777; font-size:12px;\">" + student.mycode + "</td>"
				+ "<" + varTdTh + " id=datashow" + student.id+"3" + " tabIndex=" + student.id+"3" + " ZZZonClick=\"datashow('" + student.id+"3" + "', 3, '" + student.mycode + "');\" onkeyup=\"moveCursor('" + student.mycode + "', 3, event, " + "" + (student.id+"3") + ");\" data-show='" + student.id+"3" + "'>"
				+ varText + "</" + varTdTh + ">"
//				+ student.mytext + "</" + varTdTh + ">"
/*				
				+ "<" + varTdTh + " id=datashow" + student.id+"4" + " tabIndex=" + student.id+"4" + " ZZZonClick=\"datashow('" + student.id+"4" + "', 4, '" + student.mycode + "');\" onkeyup=\"moveCursor('" + student.mycode + "', 4, event, " + "" + (student.id+"4") + ");\" data-show='" + student.id+"4" + "'>"
//				+ varPlay + "</" + varTdTh + ">"
				
				+ "<" + varTdTh + " id=datashow" + student.id+"5" + " tabIndex=" + student.id+"5" + " ZZZonClick=\"datashow('" + student.id+"5" + "', 5, '" + student.mycode + "');\" onkeyup=\"moveCursor('" + student.mycode + "', 5, event, " + "" + (student.id+"5") + ");\" data-show='" + student.id+"5" + "'>"
				+ varEdit + "</" + varTdTh + ">"
*/				
				+ "<" + varTdTh + " nowrap id=datashow" + student.id+"6" + " tabIndex=" + student.id+"6" + " ZZZonClick=\"datashow('" + student.id+"6" + "', 6, '" + student.mycode + "');\" onkeyup=\"moveCursor('" + student.mycode + "', 6, event, " + "" + (student.id+"6") + ");\" data-show='" + student.id+"6" + "'>"
//				+ varPlay + ' '
				+ varEdit + ' '
				+ '<p/>'
				+ varDel + "</" + varTdTh + ">"
				;
		})

		if (htmlString.length > 0) {
			htmlString += "</tr>"
			showGridAndHideForms();
		} else {
/*			htmlString += htmlStringButtons
			const d = new Date();
			htmlString += "<b>"
			htmlString += "Não Encontrado"
			htmlString += "<br><br>Pesquise Novamente"
			htmlString += "<br><br>"
			htmlString += d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds();
			htmlString += "</b>"
*/
			showIniciarConfiguracao();
//			document.getElementById('btnPlay').style.display='none';
		}
        $('#tblGrid tbody').html(htmlString);
//    } catch (ex) {
//        console.log(ex.message)
//    }
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
        console.log(ex.message)
    }
}

async function addStudentImportConfig(studentId, mygroup, mycode) {
    var student = getStudentFromForm(studentId, mygroup, mycode);
    try {
		var noOfDataInserted = await jsstoreCon.insert({
			into: 'Student',
			values: [student]
		});
//		alert('Sucesso \n\n Número='+student.mycode + '\n Ordem='+student.myorder + '\n Grupo='+student.mygroup + '\n Pergunta='+student.mytext + '\n '+student.myoption1 + ', '+student.myoptionkey1 + '\n '+student.myoption2 + ', '+student.myoptionkey2 + '\n '+student.myoption3 + ', '+student.myoptionkey3 + '\n '+student.myoption4 + ', '+student.myoptionkey4 + '\n '+student.myoption5 + ', '+student.myoptionkey5 + '\n '+student.myoption6 + ', '+student.myoptionkey6 + '\n '+student.myoption7 + ', '+student.myoptionkey7 + '\n '+student.myoption8 + ', '+student.myoptionkey8 + '\n '+student.myoption9 + ', '+student.myoptionkey9 + '\n '+student.myoption10 + ', '+student.myoptionkey10 + '\n '+student.myoption11 + ', '+student.myoptionkey11 + '\n '+student.myoption12 + ', '+student.myoptionkey12 + '\n '+student.myoption13 + ', '+student.myoptionkey13 + '\n '+student.myoption14 + ', '+student.myoptionkey14 + '\n '+student.myoption15 + ', '+student.myoptionkey15);
//		console.log('Sucesso \n\n Número='+student.mycode + '\n Ordem='+student.myorder + '\n Grupo='+student.mygroup + '\n Pergunta='+student.mytext);
		if (noOfDataInserted === 1) {
		}
    } catch (ex) {
        console.log(ex.message + ' error ' + student.text);
    }
}

async function addStudentImport(studentId, mygroup, mycode) {
    var student = getStudentFromForm(studentId, mygroup, mycode);
    try {
		var noOfDataInserted = await jsstoreCon.insert({
			into: 'Student',
			values: [student]
		});
//		console.log('Sucesso \n\n Número='+student.mycode + '\n Ordem='+student.myorder + '\n Grupo='+student.mygroup + '\n Pergunta='+student.mytext + '\n '+student.myoption1 + '\n '+student.myoption2 + '\n '+student.myoption3 + '\n '+student.myoption4);
//		console.log('Sucesso \n\n Número='+student.mycode + '\n Ordem='+student.myorder + '\n Grupo='+student.mygroup + '\n Pergunta='+student.mytext);
		if (noOfDataInserted === 1) {
			var mycode = document.getElementById('mycode').value;
			var myorder = document.getElementById('myorder').value;
			var mygroup = document.getElementById('mygroup').value;
			var mytext = document.getElementById('mytext').value.trim();
			refreshTableData(mycode, myorder, mygroup, mytext);
			showGridAndHideForms();
		}
		setTimeout(() => { updateStudentPlayOrder(mygroup) }, 1000); // Executa após 5 segundos para esperar o processo de update/insert terminar
    } catch (ex) {
        console.log(ex.message + ' error ' + student.text);
    }
}

async function updateStudentPlay(studentId, mygroup, mycode) {
    var student = getStudentFromFormPlay(studentId, mygroup, mycode);
//	try {
/*
	alert('student.mycorrect1answer='+student.mycorrect1answer);
	alert('student.mycorrect2answer='+student.mycorrect2answer);
	alert('student.mycorrect3answer='+student.mycorrect3answer);
	alert('student.mycorrect4answer='+student.mycorrect4answer);
	alert('student.mycorrect5answer='+student.mycorrect5answer);
	alert('student.mycorrect6answer='+student.mycorrect6answer);
	alert('student.mycorrect7answer='+student.mycorrect7answer);
	alert('student.mycorrect8answer='+student.mycorrect8answer);
*/
		var noOfDataUpdated = await jsstoreCon.update({
			in: 'Student',
			set: {
				mycorrect1answer: student.mycorrect1answer,
				mycorrect2answer: student.mycorrect2answer,
				mycorrect3answer: student.mycorrect3answer,
				mycorrect4answer: student.mycorrect4answer,
				mycorrect5answer: student.mycorrect5answer,
				mycorrect6answer: student.mycorrect6answer,
				mycorrect7answer: student.mycorrect7answer,
				mycorrect8answer: student.mycorrect8answer
			},
			where: {
				id: student.id
			}
		});
//    } catch (ex) {
//        console.log(ex.message);
//    }
}

async function updateStudentPlayClear(mygroup) {
//	try {
		var noOfDataUpdated = await jsstoreCon.update({
			in: 'Student',
			set: {
				mycorrect1answer: '',
				mycorrect2answer: '',
				mycorrect3answer: '',
				mycorrect4answer: '',
				mycorrect5answer: '',
				mycorrect6answer: '',
				mycorrect7answer: '',
				mycorrect8answer: ''
			},
			where: {
				mygroup: mygroup
			}
		});
//    } catch (ex) {
//        console.log(ex.message);
//    }
}

function getStudentFromFormPlay(studentId, mygroup, mycode) {
	var chkMycorrect1answer = '';
	if (document.getElementById('chkMycorrect1answer').checked == true) { chkMycorrect1answer = 'checked'; }
	var chkMycorrect2answer = '';
	if (document.getElementById('chkMycorrect2answer').checked == true) { chkMycorrect2answer = 'checked'; }
	var chkMycorrect3answer = '';
	if (document.getElementById('chkMycorrect3answer').checked == true) { chkMycorrect3answer = 'checked'; }
	var chkMycorrect4answer = '';
	if (document.getElementById('chkMycorrect4answer').checked == true) { chkMycorrect4answer = 'checked'; }
	var chkMycorrect5answer = '';
	if (document.getElementById('chkMycorrect5answer').checked == true) { chkMycorrect5answer = 'checked'; }
	var chkMycorrect6answer = '';
	if (document.getElementById('chkMycorrect6answer').checked == true) { chkMycorrect6answer = 'checked'; }
	var chkMycorrect7answer = '';
	if (document.getElementById('chkMycorrect7answer').checked == true) { chkMycorrect7answer = 'checked'; }
	var chkMycorrect8answer = '';
	if (document.getElementById('chkMycorrect8answer').checked == true) { chkMycorrect8answer = 'checked'; }
/*
console.log('mygroup='+mygroup + ' mycode='+mycode + ' chkMycorrect1answer=' + chkMycorrect1answer);
console.log('mygroup='+mygroup + ' mycode='+mycode + ' chkMycorrect2answer=' + chkMycorrect2answer);
console.log('mygroup='+mygroup + ' mycode='+mycode + ' chkMycorrect3answer=' + chkMycorrect3answer);
console.log('mygroup='+mygroup + ' mycode='+mycode + ' chkMycorrect4answer=' + chkMycorrect4answer);
console.log('mygroup='+mygroup + ' mycode='+mycode + ' chkMycorrect5answer=' + chkMycorrect5answer);
console.log('mygroup='+mygroup + ' mycode='+mycode + ' chkMycorrect6answer=' + chkMycorrect6answer);
console.log('mygroup='+mygroup + ' mycode='+mycode + ' chkMycorrect7answer=' + chkMycorrect7answer);
console.log('mygroup='+mygroup + ' mycode='+mycode + ' chkMycorrect8answer=' + chkMycorrect8answer);
*/
	var student = {
        id: Number(studentId),
		mygroup: $('#mygroup').val(),
        mycode: $('#mycode').val(),
		mycorrect1answer: chkMycorrect1answer,
		mycorrect2answer: chkMycorrect2answer,
		mycorrect3answer: chkMycorrect3answer,
		mycorrect4answer: chkMycorrect4answer,
		mycorrect5answer: chkMycorrect5answer,
		mycorrect6answer: chkMycorrect6answer,
		mycorrect7answer: chkMycorrect7answer,
		mycorrect8answer: chkMycorrect8answer
    };
	return student;
}

function shuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function getRandomArray(min, max) {
	var numeros = [1, 2, 3, 4, 5, 6, 7, 8];
	var numeros_gerados = shuffle(numeros);
	return numeros_gerados;
}

async function updateOrder(id, min, max) {
	try {
		var myorder = String(getRandomArray(min, max));
		var noOfDataUpdated = await jsstoreCon.update({
			in: 'Student',
			set: {
				myorder: myorder
			},
			where: {
				id: id
			}
		});
		//console.log('id='+id + ' myorder='+myorder);
        console.log(`data updated ${noOfDataUpdated}`);
    } catch (ex) {
        console.log(ex.message);
    }
}

async function updateStudentPlayOrder(mygroup) {
    try {
		var students = await jsstoreCon.select({
			from: 'Student'
			  , where: { mygroup: mygroup
			  }
		});
		students.forEach(function (student) {
//			alert('mygroup='+mygroup + ' mycode='+mycode + ' student.id='+student.id);
			var min = 1; var max = 8;
			updateOrder(student.id, min, max);
		})
    } catch (ex) {
        console.log(ex.message)
    }	
}

async function updateStudent(studentId, mygroup, mycode) {
    var student = getStudentFromForm(studentId, mygroup, mycode);
	try {
		var noOfDataUpdated = await jsstoreCon.update({
			in: 'Student',
			set: {
				mygroup: student.mygroup,
				mycode: student.mycode,
				mytext: student.mytext,
//				myorder: student.myorder,
				mysearch: student.mysearch,
				myoption1: student.myoption1,
				myoption2: student.myoption2,
				myoption3: student.myoption3,
				myoption4: student.myoption4,
				myoption5: student.myoption5,
				myoption6: student.myoption6,
				myoption7: student.myoption7,
				myoption8: student.myoption8
			},
			where: {
				id: student.id
			}
		});
        console.log(`data updated ${noOfDataUpdated}`);
		setTimeout(() => { updateStudentPlayOrder(mygroup) }, 1000); // Executa após 5 segundos para esperar o processo de update/insert terminar
		showGridAndHideForms();
        $('form').attr('data-student-id', null);
		var mygroup = document.getElementById('mygroup').value;
		var mycode = '';
		var mytext = '';
		var myorder = '';
		refreshTableData(mycode, myorder, mygroup, mytext);
        refreshFormData({});
    } catch (ex) {
        console.log(ex.message);
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
        console.log(ex.message);
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

function getStudentFromForm(studentId, mygroup, mycode) {
	var myorderFormated = '';
	myorderFormated = '000' + $('#myorder').val();
	myorderFormated = myorderFormated.substring(myorderFormated.length-3, myorderFormated.length);

	var mycodeFormated = '';
	mycodeFormated = '000' + $('#mycode').val();
	mycodeFormated = mycodeFormated.substring(mycodeFormated.length-3, mycodeFormated.length);

	var mygroup = document.getElementById('mygroupSim').value;
	
	setTimeout(() => { updateStudentPlayOrder($('#mygroup').val()) }, 1000); // Executa após 5 segundos para esperar o processo de insert terminar
	var student = {
        id: Number(studentId),
        mycode: $('#mycode').val(),
//		myorder: myorderFormated,
		mygroup: $('#mygroup').val(),
        mytext: $('#mytext').val(),
		mysearch: removeSpecials($('#mytext').val()),
		myoption1: $('#myoption1').val(),
		myoption2: $('#myoption2').val(),
		myoption3: $('#myoption3').val(),
		myoption4: $('#myoption4').val(),
		myoption5: $('#myoption5').val(),
		myoption6: $('#myoption6').val(),
		myoption7: $('#myoption7').val(),
		myoption8: $('#myoption8').val(),
		mycorrect1answer: '',
		mycorrect2answer: '',
		mycorrect3answer: '',
		mycorrect4answer: '',
		mycorrect5answer: '',
		mycorrect6answer: '',
		mycorrect7answer: '',
		mycorrect8answer: '',
		myoptionkey1: $('#myoptionkey1').val(),
		myoptionkey2: $('#myoptionkey2').val(),
		myoptionkey3: $('#myoptionkey3').val(),
		myoptionkey4: $('#myoptionkey4').val(),
		myoptionkey5: $('#myoptionkey5').val(),
		myoptionkey6: $('#myoptionkey6').val(),
		myoptionkey7: $('#myoptionkey7').val(),
		myoptionkey8: $('#myoptionkey8').val()
    };
    return student;
}

function setStudentFromImport(mygroup, mycode, myorder, mytext, myoption1, myoptionkey1, myoption2, myoptionkey2, myoption3, myoptionkey3, myoption4, myoptionkey4, myoption5, myoptionkey5, myoption6, myoptionkey6, myoption7, myoptionkey7, myoption8, myoptionkey8) {
	document.getElementById('mygroup').value = mygroup;
	document.getElementById('mycode').value = mycode;
	document.getElementById('myorder').value = myorder;
	document.getElementById('mytext').value = mytext;
	document.getElementById('myoption1').value = myoption1;
	document.getElementById('myoption2').value = myoption2;
	document.getElementById('myoption3').value = myoption3;
	document.getElementById('myoption4').value = myoption4;
	document.getElementById('myoption5').value = myoption5;
	document.getElementById('myoption6').value = myoption6;
	document.getElementById('myoption7').value = myoption7;
	document.getElementById('myoption8').value = myoption8;
	document.getElementById('myoptionkey1').value = myoptionkey1;
	document.getElementById('myoptionkey2').value = myoptionkey2;
	document.getElementById('myoptionkey3').value = myoptionkey3;
	document.getElementById('myoptionkey4').value = myoptionkey4;
	document.getElementById('myoptionkey5').value = myoptionkey5;
	document.getElementById('myoptionkey6').value = myoptionkey6;
	document.getElementById('myoptionkey7').value = myoptionkey7;
	document.getElementById('myoptionkey8').value = myoptionkey8;
//	alert(' mygroup='+document.getElementById('mygroup').value + '\n mycode='+document.getElementById('mycode').value + '\n myorder='+myorder + '\n mytext=[' +mytext+']\n' + '\n '+myoption1 + ', '+myoptionkey1 + '\n '+myoption2 + ', '+myoptionkey2 + '\n '+myoption3 + ', '+myoptionkey3 + '\n '+myoption4 + ', '+myoptionkey4 + '\n '+myoption5 + ', '+myoptionkey5 + '\n '+myoption6 + ', '+myoptionkey6 + '\n '+myoption7 + ', '+myoptionkey7 + '\n '+myoption8 + ', '+myoptionkey8);
    $('#divFormAddUpdate').show();
}

function showCorrect(valorindice) {
	if (document.getElementById('chkMycorrect'+valorindice+'answer').checked == true) {
		document.getElementById('lblcorrect' + valorindice).style.display='block';
	} else {
		document.getElementById('lblcorrect' + valorindice).style.display='none';
	}
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
	document.getElementById('tableButtons').style.display='none';
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

	if (document.getElementById('btnPlay') != null) { document.getElementById('btnPlay').style.display=''; }
	if (document.getElementById('btnAddNewManual') != null) { document.getElementById('btnAddNewManual').style.display=''; }
	if (document.getElementById('btnGear') != null) { document.getElementById('btnGear').style.display=''; }
	if (document.getElementById('tableButtons') != null) { document.getElementById('tableButtons').style.display=''; }
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
	document.getElementById('btnPlay').style.display='none';
	document.getElementById('btnAddNewManual').style.display='none';
	document.getElementById('btnGear').style.display='none';
}

function showForm1Form2() {
//	openOwner(document.getElementById('config_myowner').value);
//	openLogo('logo/logo.png');
//	openImagemFundo(localStorage.getItem('valuePlanoFundoMestre'));
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
        console.log(ex.message);
    }
}

function refreshFormData(student) {
    $('form').attr('data-student-id', student.id);
    $('#mygroup').val(student.mygroup);
    $('#mycode').val(student.mycode);
    $('#myorder').val(student.myorder);
    $('#mytext').val(student.mytext);
    $('#mysearch').val(student.mysearch);
    $('#myoption1').val(student.myoption1);
    $('#myoption2').val(student.myoption2);
    $('#myoption3').val(student.myoption3);
    $('#myoption4').val(student.myoption4);
    $('#myoption5').val(student.myoption5);
    $('#myoption6').val(student.myoption6);
    $('#myoption7').val(student.myoption7);
    $('#myoption8').val(student.myoption8);
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
		//console.log(file.name);
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
//console.log(document.getElementById('datashow' + index).innerHTML);
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

//COMMANDS window.location
//hash	parte (#) de uma URL
//host	nome de host e número de porta de uma URL
//hostname	hostname de um URL
//href	URL inteira
//origin	protocolo, hostname e número de porta de uma URL
//pathname	caminho de um URL
//port	número de porta de um URL
//protocol	protocolo de um URL
//search	consulta parte de um URL
