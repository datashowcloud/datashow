
var jsstoreCon = new JsStore.Connection();

var CONST_NIVEL_MAX = 5;
var CONST_FASE_MAX = 99; //6;
var CONST_ORANGE = '#FF4700';
var CONST_MEDIUM_SEA_GREEN = '#3CB371';
var CONST_DEEP_SKY_BLUE = '#00BFFF';
var CONST_ORANGE_DESTAK = '#ff9955';
var CONST_GRAY = 'gray';
var GLOBAL_White = 'white';
var GLOBAL_textcolor = 'white';
var GLOBAL_background = 'black';
var GLOBAL_buttoncolor = 'btn-colors';
var GLOBAL_background_black = 'black';
var COL_LOGOTIPO = 5;
var linkhelp = '';
var CONTS_languagebra = '<img src="img/bandeirabra.png" class="flutuante" width="25px" style="cursor:pointer; border-radius:50%;" title="Traduzir para Português">';
var CONTS_languageusa = '<img src="img/bandeirausa.png" class="flutuante" width="25px" style="cursor:pointer; border-radius:50%;" title="Translate to English">';
var CONST_TEMA_AWS_CLFC01 = 1;
var CONST_TEMA_AZURE_AZ900 = 2;
var CONST_TEMA_ORACLE_1ZO108522 = 3;
var CONST_CATEGORIA_TREINO = 2;
var CONST_CATEGORIA_DESAFIO = 4;

window.onload = function () {
    registerEvents();
    initDb();
	getConfigGeneral();	
	initLinkHelp();
	document.getElementById('myBody').style.background = GLOBAL_background;
	loadCombobox('mygroup', '0', '100', 'Teste');
	loadCombobox('mycode', '0', '100', 'Número');
	loadCombobox('myorder', '0', '100', 'Ordem');
	initForm();
	$('#selectMygroup').focus();
	$('#selectMygroup').select();
//	localStorage.setItem('valueText1', document.getElementById('selectMygroup').selectedIndex);
//	localStorage.setItem('valueText2', '');
//	setCookie('valueText3', '', '1');
};

async function initDb() {
    var isDbCreated = await jsstoreCon.initDb(getDbSchema());
    if (isDbCreated) {
		initConfigGeneral();
        console.log('db created');
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
			mytema: { Null: false, dataType: 'string' }, //nível de agrupamento, exemplo: AWS Practitioner, AZURE
			mycategory: { Null: false, dataType: 'string' }, //sub nível de agrupamento, exemplo: Apresentação, Treinamento, Experiência, Simulado, Desafios
			mygroup: { notNull: true, dataType: 'string' }, //qual grupo a pergunta pertence, exemplo: domínio 1, domínio 2, domínio 3
			mycode: { Null: false, dataType: 'string' }, //código único numérico da pergunta
			mytext: { notNull: true, dataType: 'string' }, //pergunta em português
			mytext2: { Null: false, dataType: 'string' }, //pergunta em inglês
			mytext3: { Null: false, dataType: 'string' }, //pergunta em espanhol
			mytext4: { Null: false, dataType: 'string' }, //pergunta em francês
			mytext5: { Null: false, dataType: 'string' }, //pergunta em hindi
			mytext6: { Null: false, dataType: 'string' }, //pergunta em mandarim
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
			mypoints: { Null: false, dataType: 'string' }, //porcentagem ou índice de acerto na tentativa 4, 5, 6, 7, exemplo: 85,50,10,100 (todas separadas por vírgula)
			mycorretas: { Null: false, dataType: 'string' }, //quantidade de corretas
			myincorretas: { Null: false, dataType: 'string' }, //quantidade de incorretas
			mynaorespondidas: { Null: false, dataType: 'string' }, //quantidade de não respondidas
			mycurrentcode: { Null: true, dataType: 'string' }, //posição atual do mycode, onde parou, antes de sair ou antes de pausar.
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
            background: { Null: false, dataType: 'string' }, //cor de fundo, usando imagem png
            textcolor: { Null: false, dataType: 'string' },
            buttoncolor: { Null: false, dataType: 'string' },
            textalign: { Null: false, dataType: 'string' },
            camporeserva: { Null: false, dataType: 'string' }
        }
    }

	var tableConfigGeneral = {
        name: 'ConfigGeneral',
        columns: {
            fontfamily: { Null: false, dataType: 'string' },
            fontsize: { Null: false, dataType: 'string' },
            background: { Null: false, dataType: 'string' }, //cor de fundo, usando imagem png
            textcolor: { Null: false, dataType: 'string' },
            buttoncolor: { Null: false, dataType: 'string' },
            textalign: { Null: false, dataType: 'string' },
            camporeserva: { Null: false, dataType: 'string' }
        }
    }

	var tableDashboard = {
        name: 'Dashboard',
        columns: {
			id: { primaryKey: true, autoIncrement: true }, //identificação única
			mygroup: { notNull: true, dataType: 'string' }, //valor idêntico à tabela Student
			mycode: { notNull: true, dataType: 'string' }, //valor único idêntico à tabela Student
			mypoints: { Null: false, dataType: 'string' }, //índice de acerto na tentativa 4, 5, 6, 7, exemplo: 85,50,10,100 (todas separadas por vírgula)
			mytry: { notNull: true, dataType: 'string' }, //quantidade de tentativas, exemplo: 1, 2, 3; tentativa 1, tentativa 2, tentativa 3
			mypercent: { notNull: true, dataType: 'string' }, //porcentagem que conseguiu
			mycorrects: { notNull: true, dataType: 'string' }, //quantidade de perguntas com respostas corretas
			myincorrects: { notNull: true, dataType: 'string' }, //quantidade de perguntas com respostas erradas
			myanswers: { notNull: true, dataType: 'string' }, //todas respostas separadas por vírgula, exemplo: "01a,02bc,03d,05a". Exemplo com a resposta 04 não foi respondida.
			mytotal: { notNull: true, dataType: 'string' } //quantidade de perguntas
        }
    }

    var db = {
        name: 'mydbsim',
        tables: [table, tableConfigGeneral, tableDashboard]
    }
    return db;
}

function registerEvents() {
    $('#btnSelectCountAll').click(function () {
		selectCountAll();
    })	
    $('#txtSearch').keyup(function () {
		if (event.keyCode == 13 || event.which == 13) { //13=tecla ENTER
			var params = new URLSearchParams(window.location.search);
			var mytema = params.get('tem');
			var mycategory = params.get('cat');
			var mycode = document.getElementById('mycode').value;
			var myorder = document.getElementById('myorder').value;
			var mygroup = document.getElementById('mygroup').value;
			var mytext = document.getElementById('mytext').value.trim();
			var mytext2 = document.getElementById('mytext2').value.trim();
			var mytext3 = document.getElementById('mytext3').value.trim();
			refreshTableData(mytema, mycategory, mycode, myorder, mygroup, mytext, mytext2, mytext3);
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
		var params = new URLSearchParams(window.location.search);
		var mytema = params.get('tem');
		var mycategory = params.get('cat');
		var row = $(this).parents().eq(1);
        var child = row.children();
		var myid = row.attr('itemid');
		var mygroup = child.eq(0).text();
		var mycode = child.eq(1).text();
        restartFase(mytema, mycategory, myid, mygroup, mycode);
    });
    $('#btnIndexConfigurar').click(function () {
		var params = new URLSearchParams(window.location.search);
		var mytema = params.get('tem');
		var mycategory = params.get('cat');
		document.getElementById('btnIndexConfigurar').style.display = 'none';
		document.getElementById('lei13709').style.display = 'none';
		location.reload(); //recarrega página importando também o teste 01
//console.log("config" + document.getElementById('selectMygroup').value + ".html?sim=" + document.getElementById('selectMygroup').value + "&tem=" + mytema + "&cat=" + mycategory);
		var DataShow_Config = window.open("config" + document.getElementById('selectMygroup').value + ".html?sim=" + document.getElementById('selectMygroup').value + "&tem=" + mytema + "&cat=" + mycategory, "_self", "top=0, width=400, height=200, left=500, location=no, menubar=no, resizable=no, scrollbars=no, status=no, titlebar=no, toolbar=no");
//		var DataShow_ConfigResult = window.open("configresult.html", "_self");
//		datashowconfigresult.focus();
	})
    $('#btnSearch').click(function () {
		var params = new URLSearchParams(window.location.search);
		var mytema = params.get('tem');
		var mycategory = params.get('cat');
		var mygroup = document.getElementById('mygroup').value;
		var mycode = document.getElementById('mycode').value;
		var myorder = document.getElementById('myorder').value;
		var mytext = document.getElementById('mytext').value.trim();
		var mytext2 = document.getElementById('mytext2').value.trim();
		var mytext3 = document.getElementById('mytext3').value.trim();
		refreshTableData(mytema, mycategory, mycode, myorder, mygroup, mytext, mytext2, mytext3);
		showGridAndHideForms();
//		$('#txtSearch').focus();
//		$('#txtSearch').select();
    })
    $('#btnCertifications').click(function () {
		window.close();
		var DataShow_Tests = window.open("certifications.html", "_self");
		datashowconfigresult.focus();
	})
    $('#selectMygroup').change(function () {
		var params = new URLSearchParams(window.location.search);
		var mytema = params.get('tem');
		var mycategory = params.get('cat');
		var mygroup = selectMygroup.value.trim();
		var mycode = '';
		var mytext = '';
		var mytext2 = '';
		var mytext3 = '';
		var myorder = '';
		if (mygroup != '00') {
			mycode = '0';
		}
		refreshTableData(mytema, mycategory, mycode, myorder, mygroup, mytext, mytext2, mytext3);
		showGridAndHideForms();
		$('#selectMygroup').focus();
		$('#selectMygroup').select();
    })
    $('#btnDeleteLirics').click(function () {
		deleteTable();
    })
    $('#btnDropDb').click(function () {
		dropdb();
//		setTimeout(() => { location.reload() }, 3000); // Executa após 1 segundo para esperar o processo
//		setTimeout(() => { var DataShow_Config = window.open("index.html", "_self"); }, 1000); // Executa após 1 segundo para esperar o processo
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
				var params = new URLSearchParams(window.location.search);
				var mytema = params.get('tem');
				var mycategory = params.get('cat');
				var mycode = document.getElementById('mycode').value;
				var myorder = document.getElementById('myorder').value;
				var mygroup = document.getElementById('mygroup').value;
				var mytext = document.getElementById('mytext').value.trim();
				var mytext2 = document.getElementById('mytext2').value.trim();
				var mytext3 = document.getElementById('mytext3').value.trim();
				var myoption1 = document.getElementById('myoption1').value.trim();
				var myoption2 = document.getElementById('myoption2').value.trim();
				var myoption3 = document.getElementById('myoption3').value.trim();
				var myoption4 = document.getElementById('myoption4').value.trim();
				var myoption5 = document.getElementById('myoption5').value.trim();
				var myoption6 = document.getElementById('myoption6').value.trim();
				var myoption7 = document.getElementById('myoption7').value.trim();
				var myoption8 = document.getElementById('myoption8').value.trim();
				
				//console.log('mycode='+mycode + ' myorder='+myorder + ' mygroup='+mygroup + ' mytext='+mytext + ' myoption1='+myoption1 + ' myoption5='+myoption5);
				
				confirmImportManual(mytema, mycategory, mycode, myorder, mygroup, mytext, mytext2, mytext3, myoption1, myoption2, myoption3, myoption4, myoption5, myoption6, myoption7, myoption8);
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
			var params = new URLSearchParams(window.location.search);
			var mytema = params.get('tem');
			var mycategory = params.get('cat');
			document.getElementById('selectMygroup').selectedIndex = 1;
			confirmImport(mytema, mycategory, 'contents2', '1'); //bíblia
			document.getElementById('selectMygroup').selectedIndex = 2;
			confirmImport(mytema, mycategory, 'contents3', '2'); //artes
			document.getElementById('selectMygroup').selectedIndex = 0;
			confirmImport(mytema, mycategory, 'contents1', '0'); //a última frase é testada na pesquisa de letras
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
		var DataShow_Help = window.open("help/help.pdf", "_self", "top=100, width=1100, height=10000, left=0, location=no, menubar=no, resizable=no, scrollbars=no, status=no, titlebar=no, toolbar=no");
    })
    $('#btnShowHelpConfig').click(function () {
		var DataShow_Help = window.open("help/helpconfig.pdf", "_self", "top=100, width=1100, height=10000, left=0, location=no, menubar=no, resizable=no, scrollbars=no, status=no, titlebar=no, toolbar=no");
    })
    $('#btnSubmit').click(function () {
		var params = new URLSearchParams(window.location.search);
		var mytema = params.get('tem');
		var mycategory = params.get('cat');
		var studentId = $('form').attr('data-student-id');
		var mygroup = document.getElementById('mygroupSim').value;
		var mycode = parseInt(document.getElementById('mycodeSim').value) - 1;
		if (studentId) {
			updateStudent(mytema, mycategory, studentId, mygroup, mycode);
		} else {
			addStudentImport(mytema, mycategory, studentId, mygroup, mycode);
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
    $('#tblEstatisticas tbody').on('click', '.edit', function () {
		var row = $(this).parents().eq(1);
        var child = row.children();
		var id = row.attr('itemid');
		var mygroup = child.eq(0).text();
		var mycode = child.eq(1).text();
		getFromTable(id, mygroup, mycode);
		showFormAddUpdate();
    });
    $('#tblEstatisticas tbody').on('click', '.restart', function () {
		var params = new URLSearchParams(window.location.search);
		var mytema = params.get('tem');
		var mycategory = params.get('cat');
		var row = $(this).parents().eq(1);
        var child = row.children();
		var myid = row.attr('itemid');
		var mygroup = child.eq(0).text();
		var mycode = child.eq(1).text();
		var result = confirm('Vou limpar e organizar as respostas dessa fase, ok?');
		if (result) {
			restartFase(mytema, mycategory, myid, mygroup, mycode);
			savePoints(mytema, mycategory, myid, mygroup, mycode);
			var id = row.attr('itemid');
			var mygroup = child.eq(0).text();
			refreshTableQuestion(mytema, mycategory, id, mygroup, '1');
			showFormSim();
		}
    });
    $('#tblEstatisticas tbody').on('click', '.delete', function () {
        var result = confirm('Excluir, ok?');
        if (result) {
            var studentId = $(this).parents().eq(1).attr('itemid');
            deleteStudent(Number(studentId));
        }
    });
    $('#tblEstatisticas tbody').on('click', '.deletefase', function () {
		var result = confirm('Não faça nada durante a atualização. \n\nAguarde o botão azul aparecer na próxima página.');
		if (result) {
			var params = new URLSearchParams(window.location.search);
			var mytema = params.get('tem');
			var mycategory = params.get('cat');
			var row = $(this).parents().eq(1);
			var child = row.children();
			var myid = row.attr('itemid');
			var mygroup = child.eq(0).text();
			var mycode = child.eq(1).text();
//alert('mytema='+mytema + ' mycategory='+mycategory + ' mygroup='+mygroup + ' mycode='+mycode + ' myid='+myid);
			deletefase(mytema, mycategory, mygroup, mycode, myid);
			setTimeout(() => { var DataShow_Config = window.open("T"+mytema + "C"+mycategory+ "G"+mygroup + ".html?sim=" + mygroup + "&tem=" + mytema + "&cat=" + mycategory, "_self", "top=0, width=400, height=200, left=500, location=no, menubar=no, resizable=no, scrollbars=no, status=no, titlebar=no, toolbar=no"); }, 3000); // Executa após 1 segundo para esperar o processo
		}
    });
    $('#tblEstatisticas tbody').on('click', '.playsim', function () {
		var params = new URLSearchParams(window.location.search);
		var mytema = params.get('tem');
		var mycategory = params.get('cat');
		var row = $(this).parents().eq(1);
		var child = row.children();
		var id = row.attr('itemid');
		var mygroup = child.eq(0).text();
		var mycode = child.eq(1).text();
		refreshTableQuestion(mytema, mycategory, id, mygroup, '1');
		showFormSim();
    });	
    $('#tblEstatisticas tbody').on('click', '.freeze', function () {
		freezeDataShow(localStorage.getItem('valueAoVivo'));
    });
    $('#tblEstatisticas tbody').on('click', '.logo', function () {
		showLogo();
//		freezeDataShow('false');
    });
    $('#tblEstatisticas tbody').on('click', '.complete', function () {
		searchComplete();
    });
    $('#tblEstatisticas tbody').on('click', '.videoplaypause', function () {
		videoPlayPause();
    });
    $('#tblEstatisticas tbody').on('click', '.simulator', function () {
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
		var params = new URLSearchParams(window.location.search);
		var mytema = params.get('tem');
		var mycategory = params.get('cat');
		var myid = document.getElementById('myidSim').value;
		var mygroup = document.getElementById('mygroupSim').value;
		var mycode = parseInt(document.getElementById('mycodeSim').value) - 1;
		if (mycode > 0) {
			refreshTableQuestion(mytema, mycategory, myid, mygroup, mycode);
		}
    })
    $('#btnNext').click(function () {
		var params = new URLSearchParams(window.location.search);
		var mytema = params.get('tem');
		var mycategory = params.get('cat');
		var myid = document.getElementById('myidSim').value;
		var mygroup = document.getElementById('mygroupSim').value;
		var mycode = parseInt(document.getElementById('mycodeSim').value) + 1;
		refreshTableQuestion(mytema, mycategory, myid, mygroup, mycode);
		savePoints(mytema, mycategory, myid, mygroup, mycode);
    })
	$('#btnPause').click(function () {
		showFormApresentacao();
		//exitQuestions();
    });
	$('#btnTerminar').click(function () {
		var params = new URLSearchParams(window.location.search);
		var mytema = params.get('tem');
		var mycategory = params.get('cat');
		var myid = document.getElementById('myidSim').value;
		var mygroup = document.getElementById('mygroupSim').value;
		var mycode = parseInt(document.getElementById('mycodeSim').value) + 1;
		setTimeout(() => { savePoints(mytema, mycategory, myid, mygroup, mycode) }, 1000); // Executa após alguns segundos para esperar o término do processo
		setTimeout(() => { changeFaseNivel(mytema, mycategory, myid, mygroup, mycode) }, 1000); // Executa após alguns segundos para esperar o término do processo
    });
	$('#btnGear').click(function () {
		if (document.getElementById('divGear').style.display == 'none') {
			showFormGear();
		} else {
			showGridAndHideForms();
		}
    })
	$('#btnRefresh').click(function () {
		var params = new URLSearchParams(window.location.search);
		var mytema = params.get('tem');
		var mycategory = params.get('cat');
		refreshTableData(mytema, mycategory, '0', '', '', '');
	})
	$('#btnPaginaInicial').click(function () {
		showFormCategory();
	})
	$('#btnNightDay').click(function () {
		updateConfigGeneral();
		setConfigBotoes();
	})
	$('#btnFormCategory').click(function () {
		var DataShow_Config = window.open("index.html", "_self");
	})

	$('#imgTema1Apresentacao').click(function () {
		changeTema('1');
	})
	$('#imgTema2Apresentacao').click(function () {
		changeTema('2');
	})
	$('#imgTema3Apresentacao').click(function () {
		changeTema('3');
	})

	$('#btnTema1Apresentacao').click(function () {
		changeTema('1');
	})
	$('#btnTema2Apresentacao').click(function () {
		changeTema('2');
	})
	$('#btnTema3Apresentacao').click(function () {
		changeTema('3');
	})

	$('#imgTema1MenuTopo').click(function () {
		changeTema('1');
	})
	$('#imgTema2MenuTopo').click(function () {
		changeTema('2');
	})
	$('#imgTema3MenuTopo').click(function () {
		changeTema('3');
	})

	$('#mytextSim').click(function () {
		if (document.getElementById('mytextSim2') != null && document.getElementById('mytextSim2').innerText.length > 10) {
			document.getElementById('mytextSim2').style.display='';
			document.getElementById('mytextSim').style.display='none';
		} else {
			alert('Fase ainda sem tradução.');
		}
	})
	$('#mytextSim2').click(function () {
		if (document.getElementById('mytextSim') != null && document.getElementById('mytextSim').innerText.length > 10) {
			document.getElementById('mytextSim').style.display='';
			document.getElementById('mytextSim2').style.display='none';
		} else {
			alert('Ainda sem tradução nessa fase.');
		}
	})
	$('#chkMycorrect1answer').click(function () {
		var index = '1';
		setBackgroundColor(index, CONST_MEDIUM_SEA_GREEN);
		showCorrect(index, '', '', '');
	})
	$('#chkMycorrect2answer').click(function () {
		var index = '2';
		setBackgroundColor(index, CONST_MEDIUM_SEA_GREEN);
		showCorrect(index, '', '', '');
	})
	$('#chkMycorrect3answer').click(function () {
		var index = '3';
		setBackgroundColor(index, CONST_MEDIUM_SEA_GREEN);
		showCorrect(index, '', '', '');
	})
	$('#chkMycorrect4answer').click(function () {
		var index = '4';
		setBackgroundColor(index, CONST_MEDIUM_SEA_GREEN);
		showCorrect(index, '', '', '');
	})
	$('#chkMycorrect5answer').click(function () {
		var index = '5';
		setBackgroundColor(index, '#FF5555');
		showCorrect(index, '', '', '');
	})
	$('#chkMycorrect6answer').click(function () {
		var index = '6';
		setBackgroundColor(index, '#FF5555');
		showCorrect(index, '', '', '');
	})
	$('#chkMycorrect7answer').click(function () {
		var index = '7';
		setBackgroundColor(index, '#FF5555');
		showCorrect(index, '', '', '');
	})
	$('#chkMycorrect8answer').click(function () {
		var index = '8';
		setBackgroundColor(index, '#FF5555');
		showCorrect(index, '', '', '');
	})
	$('#btnListaPerguntas').click(function () {
		var params = new URLSearchParams(window.location.search);
		var mytema = params.get('tem');
		var mycategory = params.get('cat');
		refreshTableData(mytema, mycategory, '0', '', '', '');
		showGridAndHideForms();
	})
	$('#btnEstatisticas').click(function () {
	})
	$('#btnUser').click(function () {
		showFormUser();
	})
	$('#btnEntrar').click(function () {
		var id = document.getElementById('txtId').value;
		var pass = document.getElementById('txtPass').value;
		var key = localStorage.getItem('key');
		login(id, pass, key);
	})
	$('#btnDesconectar').click(function () {
		//var result = confirm('Desconectar?');
		//if (result) {
			logout();
		//}
	})
	$('#btnFecharFormUser').click(function () {
		showFormApresentacao();
	})
}

async function initConfigGeneral() {
	GLOBAL_textcolor = 'white';
	GLOBAL_background = 'black';
	GLOBAL_buttoncolor = 'btn-colors';
	try {
		var configgeneral = {
			fontfamily: 'Times New Roman',
			fontsize: '16',
			background: GLOBAL_background,
			textcolor: GLOBAL_textcolor,
			buttoncolor: GLOBAL_buttoncolor,
			textalign: 'left'
		};
		var noOfDataInserted = await jsstoreCon.insert({
			into: 'ConfigGeneral',
			values: [configgeneral]
		});
//		console.log('Sucesso na configuração geral');
		if (noOfDataInserted === 1) {
		}
    } catch (ex) {
        console.log(ex.message + ' error ');
    }
}

async function updateConfigGeneral() {	
	if (GLOBAL_background == 'white') {
		GLOBAL_background = 'black';
		GLOBAL_textcolor = 'white';
		GLOBAL_buttoncolor = 'btn-primary';
	} else {
		GLOBAL_background = 'white';
		GLOBAL_textcolor = 'gray';
		GLOBAL_buttoncolor = 'btn-colors';
	}
	
	setConfigGeneral(GLOBAL_textcolor, GLOBAL_background, GLOBAL_buttoncolor);

	var noOfDataUpdated = await jsstoreCon.update({
		in: 'ConfigGeneral',
		set: {
			fontfamily: 'Times New Roman',
			fontsize: '16',
			background: '' + GLOBAL_background + '',
			textcolor: '' + GLOBAL_textcolor + '',
			buttoncolor: '' + GLOBAL_buttoncolor + '',
			textalign: 'left'
		}
	});
}

async function getConfigGeneral() {
	var configsgeneral = await jsstoreCon.select({
		from: 'ConfigGeneral'
	});
	configsgeneral.forEach(function (configgeneral) {
		GLOBAL_textcolor = configgeneral.textcolor;
		GLOBAL_background = configgeneral.background;
		GLOBAL_buttoncolor = configgeneral.buttoncolor;
	})
	setConfigGeneral(GLOBAL_textcolor, GLOBAL_background, GLOBAL_buttoncolor);
}

async function setConfigGeneral(textcolor, background, buttoncolor) {
	var b = '';
	if (background != 'white') {
		b = '-b';
	}
	//apresentação tela inicial
	if (document.getElementById('imgTema1Apresentacao') != null) {
		document.getElementById('imgTema1Apresentacao').src = 'img/clf-c01' + b + '.png';
		document.getElementById('imgTema2Apresentacao').src = 'img/az-900' + b + '.png';
		document.getElementById('imgTema3Apresentacao').src = 'img/1z0-1085-22' + b + '.png';
	}
	//menu lateral direito
	if (document.getElementById('imgTema1MenuTopo') != null) {
		document.getElementById('imgTema1MenuTopo').src = 'img/clf-c01' + b + '.png';
		document.getElementById('imgTema2MenuTopo').src = 'img/az-900' + b + '.png';
		document.getElementById('imgTema3MenuTopo').src = 'img/1z0-1085-22' + b + '.png';
	}

	//imagem do tema na tela de nível
	var params = new URLSearchParams(window.location.search);
	var mytema = params.get('tem');
	if (document.getElementById('imgNivelTema') != null) {
		if (mytema == '1') {
			document.getElementById('imgNivelTema').src = 'img/clf-c01' + b + '.png';
		} else if (mytema == '2') {
			document.getElementById('imgNivelTema').src = 'img/az-900' + b + '.png';
		} else if (mytema == '3') {
			document.getElementById('imgNivelTema').src = 'img/1z0-1085-22' + b + '.png';
		} else if (mytema == '3') {
			document.getElementById('imgNivelTema').src = 'img/clf-c01' + b + '.png';
		}
	}

	if (document.getElementById('mytextSim') != null) {
		document.getElementById('mytextSim').style.color = textcolor;
	}
	if (document.getElementById('mytextSim2') != null) {
		document.getElementById('mytextSim2').style.color = textcolor;
	}

	for (var index=1; index<9; index++) {
		if (document.getElementById('mycorrect' + index + 'answer') != null) {
			document.getElementById('mycorrect' + index + 'answer').style.color = textcolor;
		}
	}
/*
	if (document.getElementById('mycorrect1answer') != null) {
		document.getElementById('mycorrect1answer').style.color = textcolor;
	}
	if (document.getElementById('mycorrect2answer') != null) {
		document.getElementById('mycorrect2answer').style.color = textcolor;
	}
	if (document.getElementById('mycorrect3answer') != null) {
		document.getElementById('mycorrect3answer').style.color = textcolor;
	}
	if (document.getElementById('mycorrect4answer') != null) {
		document.getElementById('mycorrect4answer').style.color = textcolor;
	}
	if (document.getElementById('mycorrect4answer') != null) {
		document.getElementById('mycorrect5answer').style.color = textcolor;
	}
	document.getElementById('mycorrect6answer').style.color = textcolor;
	document.getElementById('mycorrect7answer').style.color = textcolor;
	document.getElementById('mycorrect8answer').style.color = textcolor;
*/
/*	document.getElementById('mytip1').style.color = textcolor;
	document.getElementById('mytip2').style.color = textcolor;
	document.getElementById('mytip3').style.color = textcolor;
	document.getElementById('mytip4').style.color = textcolor;
	document.getElementById('mytip5').style.color = textcolor;
	document.getElementById('mytip6').style.color = textcolor;
	document.getElementById('mytip7').style.color = textcolor;
	document.getElementById('mytip8').style.color = textcolor;
*/
	if (document.getElementById('myBody') != null) {
		document.getElementById('myBody').style.background = background;
	}
	if (document.getElementById('menutopodireito') != null) {
		document.getElementById('menutopodireito').style.color = 'white';
	}
/*
	document.getElementById('txtCalculo').style.background = background;
	document.getElementById('txtIncorretas').style.background = background;
	document.getElementById('txtCorretas').style.background = background;
*/
	if(document.getElementById('FormularioEditorConfiguracoes') != null) {
		document.getElementById('FormularioEditorConfiguracoes').style.color = textcolor;
	}
	
	var classe = '';
/*
	if(document.getElementById('btnBackward') != null) {
		classe = document.getElementById('btnBackward').classList.value;
		classe = classe.substring(4, classe.length);
		document.getElementById('btnBackward').classList.remove(classe);
	}

	//campos e botões
	if (buttoncolor == 'btn-colors') {
		if(document.getElementById('btnBackward') != null) {
			document.getElementById('btnBackward').classList.add('btn-danger');
		}
		if(document.getElementById('selButtonColor') != null) {
			document.getElementById('selButtonColor').classList.add('btn-primary');
		}
	} else {
		if(document.getElementById('btnBackward') != null) {
			document.getElementById('btnBackward').classList.add(buttoncolor);
		}
	}
*/
}

//This function select table play
async function refreshTableQuestion(mytema, mycategory, myid, mygroup, mycode) {
//    try {
		var totalperguntas = await jsstoreCon.count({
			from: 'Student'
				, where: { mytema: mytema + ''
				, mycategory: mycategory + ''
				, mygroup: mygroup + ''
			  }
		});
		totalperguntas = parseInt(totalperguntas) - 1;
		setDashboard(mytema, mycategory, myid, mygroup, mycode);
		var students = await jsstoreCon.select({ //seleciona uma pergunta selecionada pelo mytema, mycategory, mygroup, mycode
			from: 'Student'
				, where: { mytema: mytema + ''
				, mycategory: mycategory + ''
				, mygroup: mygroup + ''
				, mycode: mycode + ''
			  }
		});
		//alert('mytema='+mytema + ' mycategory='+mycategory + ' myid='+myid + ' mygroup='+mygroup + ' mycode='+mycode);
		if (students == '') {
			document.getElementById('btnTerminar').style.display = '';
			document.getElementById('btnTerminar').focus();
			return;
		}
			limpaInputbox(students);
			students.forEach(function (student) {
				document.getElementById('myorderSim').style.display='none';
				document.getElementById('myidSim').style.display='none';
				document.getElementById('mygroupSim').style.display='none';
				document.getElementById('mycodeSim').style.display='none';
//				for (var index=1; index<9; index++) {
//					document.getElementById('mycorrect' + parseInt(index) + 'Sim').style.display='none';
//				}
				$('#myidSim').val(student.id);
				$('#mygroupSim').val(student.mygroup);
				$('#mycodeSim').val(student.mycode);
				$('#myorderSim').val(student.myorder);
				
//				document.getElementById('mytextSim').innerHTML = '<div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">26%</div></div>'
				document.getElementById('mytextSim').innerHTML = CONTS_languageusa + ' ' + student.mycode + '/' + totalperguntas + '. ' + student.mytext;
				document.getElementById('mytextSim2').innerHTML = CONTS_languagebra + ' ' + student.mycode + '/' + totalperguntas + '. ' + student.mytext2;

				var valorIndice = '';
				var myorder = student.myorder;
				//erro
				if (myorder == null) {
					alert('Clique em "Atualizar fase". Nova versão disponível.');
					showGridAndHideForms();
				} else {
					myorder = myorder.replaceAll('\,', '');
				
					for (var index=0; index<8; index++) {
						varMyorder = myorder.substring(index,index+1);
						var textlink = '';
						var linkhref = '';
						var myoption = '';
						var mycorrect = '';
							 if (varMyorder == '1') { textlink = student.myoptionkey1; myoption = selectKeyMyoption(student.myoption1); mycorrect = student.mycorrect1answer; }
						else if (varMyorder == '2') { textlink = student.myoptionkey2; myoption = selectKeyMyoption(student.myoption2); mycorrect = student.mycorrect2answer; }
						else if (varMyorder == '3') { textlink = student.myoptionkey3; myoption = selectKeyMyoption(student.myoption3); mycorrect = student.mycorrect3answer; }
						else if (varMyorder == '4') { textlink = student.myoptionkey4; myoption = selectKeyMyoption(student.myoption4); mycorrect = student.mycorrect4answer; }
						else if (varMyorder == '5') { textlink = student.myoptionkey5; myoption = selectKeyMyoption(student.myoption5); mycorrect = student.mycorrect5answer; }
						else if (varMyorder == '6') { textlink = student.myoptionkey6; myoption = selectKeyMyoption(student.myoption6); mycorrect = student.mycorrect6answer; }
						else if (varMyorder == '7') { textlink = student.myoptionkey7; myoption = selectKeyMyoption(student.myoption7); mycorrect = student.mycorrect7answer; }
						else if (varMyorder == '8') { textlink = student.myoptionkey8; myoption = selectKeyMyoption(student.myoption8); mycorrect = student.mycorrect8answer; }
						if (textlink.substring(0, 4) == 'tip:') {
							textlink = textlink.substring(4);
							linkhref = '';
						} else {
							if (document.getElementById(textlink) != null && textlink.length > 0) {
								textlink = document.getElementById(textlink).innerHTML;
								linkhref = '<br/><a href=' + document.getElementById('link_' + 'EC2').href + ' target="_blank" style="color:' + 'gray' + ';">veja mais na internet</a>';
							}
						}
						document.getElementById('chkMycorrect' + parseInt(index+1) + 'answer').value = varMyorder;
						$('chkMycorrect' + parseInt(index+1) + 'answer').attr('data-myorder', varMyorder);
						$('form').attr('data-student-id', student.id); //alert($('form').attr('data-student-id'));
						
						//document.getElementById('mycorrect' + parseInt(index+1) + 'answer').innerHTML = selectKeyMyoption(myoption) + ' <a href="#"><i class="fa fa-plus" style="color:' + CONST_MEDIUM_SEA_GREEN + ';" onclick="showTip(' + parseInt(index+1) + ');" > <font color=gray>(cola'+ varMyorder +')</i></a>';
						document.getElementById('mycorrect' + parseInt(index+1) + 'answer').innerHTML = selectKeyMyoption(myoption) + ' <a href="#"><i class="fa fa-plus" style="color:' + CONST_MEDIUM_SEA_GREEN + ';" onclick="showTip(' + parseInt(index+1) + ');" > <font color=' + CONST_GRAY + '>(cola)</font)</i></a>';
						document.getElementById('mytip' + parseInt(index+1)).innerHTML = textlink + linkhref

						//checa as respostas já selecionadas anteriormente
						if (mycorrect == 'checked') {
							for (var indexchk=1; indexchk<9; indexchk++) {
								//alert('mycorrect='+mycorrect + ' varMyorder='+varMyorder + ' chkMycorrectanswer'+indexchk + '= '+document.getElementById('chkMycorrect'+ indexchk + 'answer').value);
								if (document.getElementById('chkMycorrect'+ indexchk + 'answer').value == varMyorder) {
									document.getElementById('chkMycorrect' + indexchk + 'answer').checked = true;
									if (varMyorder < 5) {
										setBackgroundColor(indexchk, CONST_MEDIUM_SEA_GREEN);
									} else {
										setBackgroundColor(indexchk, '#FF5555');
									}
								}
							}
						}
						if (myoption.length > 0) {
							//alert('myoption=['+myoption+']');
							document.getElementById('mycorrect' + parseInt(index+1) + 'Sim').style.display='';
						} else {
							document.getElementById('mycorrect' + parseInt(index+1) + 'Sim').style.display='none';
						}
					}
				}
			})
		
//    } catch (ex) {
//        console.log(ex.message)
//    }	
}

//This function refreshes the table
async function refreshTableData(mytema, mycategory, mycode, myorder, mygroup, mytext, mytext2, mytext3) {
//    try {
//alert('mytema='+mytema + ' mycategory='+mycategory + ' mycode='+mycode + ' myorder='+myorder + ' mygroup='+mygroup);
		if (mygroup == '' && mycode == '') {
			var students = await jsstoreCon.select({
				from: 'Student'
					, where: { mytema: mytema + ''
					, mycategory: mycategory + ''
				}
				, order: [ {by: 'mygroup', type: 'desc'}, {by: 'mycode'} ]
			});
		} else if (mygroup != '' && mycode != '') {
			var students = await jsstoreCon.select({
				from: 'Student'
					, where: { mytema: mytema + ''
					, mycategory: mycategory + ''
					, mygroup: mygroup + ''
					, mycode: mycode + ''
				}
				, order: [ {by: 'mygroup', type: 'desc'}, {by: 'mycode'} ]
			});
		} else if (mygroup != '' && mycode == '') {
			var students = await jsstoreCon.select({
				from: 'Student'
					, where: { mytema: mytema + ''
					, mycategory: mycategory + ''
					, mygroup: mygroup + ''
				}
				, order: [ {by: 'mygroup', type: 'desc'}, {by: 'mycode'} ]
			});
		} else if (mygroup == '' && mycode != '') {
			var students = await jsstoreCon.select({
				from: 'Student'
					, where: { mytema: mytema + ''
					, mycategory: mycategory + ''
					, mycode: mycode + ''
				}
				, order: [ {by: 'mygroup', type: 'desc'}, {by: 'mycode'} ]
			});
		}

		var students_count = 0;
		if (students != '') { //calcula students_count de todas perguntas da fase e categoria e grupo selecionado
			var students_group = await jsstoreCon.select({
				from: 'Student'
					, where: { mytema: mytema + ''
					, mycategory: mycategory + ''
					, mygroup: '' + students[0].mygroup + ''
				}
			});
			students_group.forEach(function (student) {
				if (student.mycorrect1answer == '' && student.mycorrect2answer == '' && student.mycorrect3answer == '' && student.mycorrect4answer == ''
				 && student.mycorrect5answer == '' && student.mycorrect6answer == '' && student.mycorrect7answer == '' && student.mycorrect8answer == '') {
					students_count = parseInt(students_count + 1);
				}
			})
		}
		
		var varButtonRestart = 'color:gray; font-size:20px;';
		var varCount = '<div class="playsim btn btn-success flutuante" style="background-color:' + CONST_MEDIUM_SEA_GREEN + '; ">' + parseInt(students_count - 1) + '</div>';
		if (parseInt(students_count - 1) == 0) {
			varCount = '';
			varButtonRestart = 'color:' + CONST_MEDIUM_SEA_GREEN + '; font-size:20px;';
		}
		
		setConfigBotoes();

		var htmlString = "";
		var varTdTh = '';
		var htmlStringButtons = ""; //getButtonsBar();
		var varNivel = '<tr><td>FASE</td></tr>';
		var varNivelLinha = '';
		var varNivelMax = '';
		var varButtonLineStyle = 'color:gray; font-size:18px;';
		var varButtonLine = '<i class=\"fa fa-play avatarflutuante\" style="color:' + CONST_MEDIUM_SEA_GREEN + '; font-size:15px;"></i>';
		var varRestart = '';
		
		students.forEach(function (student) {
			if (student.mycode == '0') {
				varTdTh = 'td';
				if (varCount == '') {
					if (student.mypoints <= 0) {
						varRestart = '';
						varCount = '<button class="playsim btn btn-success" style="background-color:' + CONST_MEDIUM_SEA_GREEN + '; text-align:right;">fazer</button>';
					} else if (student.mypoints < 70) {
						varRestart = '<a href=\"#\" class=\"restart\" style=\"' + varButtonRestart + ' text-align:right; \"><button class="btn btn-danger flutuante">refazer</button></a>';
					} else if (student.mypoints < 100) {
						varRestart = '<a href=\"#\" class=\"restart\" style=\"' + varButtonRestart + ' text-align:right; \"><button class="btn btn-success flutuante" style="background-color:' + CONST_MEDIUM_SEA_GREEN + ';">refazer</button></a>';
					} else {
						varRestart = '<a href=\"#\" class=\"restart\" style=\"' + varButtonRestart + ' text-align:right; \"><button class="btn btn-light">refazer</button></a>';
					}
				} else {
					varRestart = '';
				}
			} else {
				varTdTh = 'td';
				varRestart = '<a href=\"#\" class=\"restart\"><i class=\"fa fa-refresh\" style=\"height:25px; ' + 'color:gray; font-size:20px;' + '\"></i></a>';
			}
			
			if (varNivel != student.mygroup.substring(0, 1)) {
				varNivel = student.mygroup.substring(0, 1);
//				varNivelLinha = '<tr><td></td><th nowrap><font color="gray" style="font-size:20px;"><i class=\"fa fa-unlock\"></i> NÍVEL ' + student.mygroup.substring(0, 1) + ' de ' + parseInt(CONST_NIVEL_MAX) + '</font></th></tr>';
				varNivelLinha = '<tr style="border-bottom: 1px solid #ddd; border-top: 1px solid #ddd;"><td></td><td nowrap style="text-align:left;" colspan=99><font color="gray"  style="font-size:20px;"> &nbsp; <b>' + getTemaCategoria() + ' <i class="fa fa-chevron-right"></i> &nbsp;Nível ' + student.mygroup.substring(0, 1) + '</b></font></td></tr>';
			} else {
				varNivelLinha = '';
			}
			if (varNivelMax == '') {
				varNivelMax = varNivel;
			}

			htmlString = htmlString + varNivelLinha;
			htmlString += "<tr ItemId=" + student.id + ' style="border-bottom: 1px solid #ddd;">'
				//identificação mygroup
				+ "<td style=\"color:#000000; font-size:1px; \">" + student.mygroup + "</td>"
				
				//texto
				+ "<" + varTdTh + " style=\"text-align:left;\" id=datashow" + student.id+"3" + " tabIndex=" + student.id+"3" + " ZZZonClick=\"datashow('" + student.id+"3" + "', 3, '" + student.mycode + "');\" onkeyup=\"moveCursor('" + student.mycode + "', 3, event, " + "" + (student.id+"3") + ");\" data-show='" + student.id+"3" + "'>"
					+ '&nbsp; <a href=\"#\" class=\"playsim\" style=\"' + varButtonLineStyle + '\">' + student.mytext + '</a> ' + '</' + varTdTh + '>'
				
				//botão delete e refresh fase
				+ '<' + varTdTh + ' style=\"' + varButtonLineStyle + '\">' + '<button class=\"deletefase flutuante\" style=\"color:white; font-size:20px; border: 1px solid gray; background-color:gray; border-radius:50%; \" title=\"Atualizar fase\"> <i class=\"fa fa-refresh\"></i> </button>'
				
				//porcentagem
				+ '<' + varTdTh + ' style=\"' + varButtonLineStyle + '\">' + student.mypoints + '%</' + varTdTh + '>'
				
				//botão playsim ou link refazer
				+ '<' + varTdTh + ' style="text-align:right;">' + varButtonLine + ' ' + varRestart + varCount + '</a>' + "</" + varTdTh + ">"


				+ "</" + varTdTh + ">"
				+ '<td>&nbsp;&nbsp;</td>'
				;
				
				varButtonLineStyle = 'color:gray;  font-size:18px;';
				varButtonLine = ''; //				varButtonLine = '<i class=\"fa fa-check\" style="color:' + CONST_DEEP_SKY_BLUE + '; font-size:20px;"></i>';
				varButtonRestart = 'color:gray; font-size:20px;';
				varCount = '';
		})


		varNivelLinha = '';
//		for (var item=CONST_NIVEL_MAX; item>=parseInt(varNivelMax)+1; item--) {
//			varNivelLinha = varNivelLinha + '<tr><td colspan=99><font color="gray" style="font-size:15px;"><i class=\"fa fa-lock\"></i> NÍVEL ' + item + '</font></td></tr>';
//		}

/*		var varMenuNivelFase = '';
		varMenuNivelFase = varMenuNivelFase + '<table>';
		varMenuNivelFase = varMenuNivelFase + '<tr>';
		varMenuNivelFase = varMenuNivelFase + '<td nowrap colspan=3 align=right> <button class="botao flutuante" onclick="changeCategory(\'2\');"><i class="fa fa-book"></i> Treino</button></td>';
		varMenuNivelFase = varMenuNivelFase + '<td nowrap colspan=2> <button class="botao flutuante" onclick="changeCategory(\'4\');"><i class="fa fa-road"></i> Desafio</button></td>';
		varMenuNivelFase = varMenuNivelFase + '</tr>';
		varMenuNivelFase = varMenuNivelFase + '</table>';
		htmlString = varMenuNivelFase + varNivelLinha + htmlString;
*/
		htmlString = varNivelLinha + htmlString;
		
		if (htmlString.length > 0) {
			htmlString += "</tr>"
//			showFormCategory();
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
////			var DataShow_Config = window.open("config" + document.getElementById('selectMygroup').value + ".html?sim=" + document.getElementById('selectMygroup').value + "&tem=" + mytema + "&cat=" + mycategory, "_self", "top=0, width=400, height=200, left=500, location=no, menubar=no, resizable=no, scrollbars=no, status=no, titlebar=no, toolbar=no");
//			var DataShow_Config = window.open("T"+mytema + "C"+mycategory+ "G10" + ".html?sim=" + document.getElementById('selectMygroup').value + "&tem=" + mytema + "&cat=" + mycategory, "_self", "top=0, width=400, height=200, left=500, location=no, menubar=no, resizable=no, scrollbars=no, status=no, titlebar=no, toolbar=no");
			//showIniciarConfiguracao();
//			document.getElementById('btnPlay').style.display='none';
		}
        $('#tblEstatisticas tbody').html(htmlString);
//    } catch (ex) {
//        console.log(ex.message)
//    }
}

//This function refreshes the table
async function refreshTableNivel(mytema, mycategory, mycode, myorder, mygroup, mytext, mytext2, mytext3) {
		var students = await jsstoreCon.select({
			from: 'Student'
				, where: { mytema: mytema + ''
				, mycategory: mycategory + ''
			}
			, order: [ {by: 'mygroup', type: 'asc'} ]
		});

		setConfigBotoes(); //atualiza o destaque de cor dos botões de modo de jogo

		var htmlString = "";
		var varNivel = '1';
		var myid = '1'; //não é usado
		mycode = '1';
		students.forEach(function (student) {
			varNivel = student.mygroup;
			mygroup = student.mygroup;
		})
		
		htmlString = '';
		htmlString = htmlString + '<tr>';
		htmlString = htmlString + '<td>';
		htmlString = htmlString + '<i class="fa fa-play avatarflutuante" style="color:#00FF7F; font-size:15px;"></i>';
		htmlString = htmlString + '<label class="flutuante" style="border-radius:30px; border-style:double; border-color:white; border-width:2px; color:#000000; background-color:#FFFFFF;">';
		htmlString = htmlString + '<button id="btnNivel" class="btn btn-success" onclick="refreshTableQuestion(' + mytema + ', ' + mycategory + ', ' + myid + ', ' + mygroup + ', ' + mycode + '); showFormSim();" style="border-radius:30px; font-size:30px; font-family:Helvetica; font-weight:bold; border-width:0px; -webkit-text-stroke-width: 1px; ">';
		htmlString = htmlString + '&nbsp;&nbsp;NÍVEL ' + varNivel + '&nbsp;&nbsp;';
		htmlString = htmlString + '</button>';
		htmlString = htmlString + '</label>';
		htmlString = htmlString + '</td>';
		htmlString = htmlString + '</tr>';

        $('#tblNivel tbody').html(htmlString);
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
		$('#tblEstatisticas tbody').html(labelStudents + '<br/>' + '<br/>' + buttonFechar);
	} catch (ex) {
        console.log(ex.message)
    }
}

async function deletefase(mytema, mycategory, mygroup, mycode, myid) {
    try {
		var noOfStudentRemoved = await jsstoreCon.remove({
			from: 'Student'
		  , where: { mytema: mytema + ''
			, mycategory: mycategory + ''
			, mygroup: mygroup + ''
//			where: {
//				mygroup: mygroup + ''
			}
		});
        console.log(`${noOfStudentRemoved} students removed`);
    } catch (ex) {
        console.log(ex.message);
    }
}

function initForm() {
	var params = new URLSearchParams(window.location.search);
	var mytema = params.get('tem');
	var mycategory = params.get('cat');
	if ((mytema == null || mycategory == null)) {
		showFormCategory();
	} else {
		document.getElementById('menutopodireito').style.display=''; //exibe menu topo
		refreshTableNivel(mytema, mycategory, '0', '', '', '');
		showFormApresentacao();
		if (validaLicenca() == false) {
			console.log('Lembre-se de conectar.')
		}
	}
}

function validaLicenca() {
	var id = localStorage.getItem('id');
	var key = localStorage.getItem('key');

	var valido = false;
	if (id != null && key != null) {
//alert('validaLicenca: '+localStorage.getItem('id') + ' key='+localStorage.getItem('key'));
		if (id.toLowerCase() == 'a' && key == '202303010000') {
			valido = true;
		} else if (id.toLowerCase() == 'admin' && key == '202303010000') {
			valido = true;
		} else if (id.toLowerCase() == 'santiago' && key == '202303010000') {
			valido = true;
		}
	}
	if (valido == true) {
		conectaUsuarioValido(id);
	}
	return valido;
}

function login(id, pass, key) {
	if (validalogin(id, pass, key) == true) {
		localStorage.setItem('id', id);
		localStorage.setItem('key', '202303010000');
		conectaUsuarioValido(id);
		showFormApresentacao();
		alert('Parabéns! \nVocê tem 1 licença mensal para 1 dispositivo.');
		return;
	} else {
		document.getElementById('txtId').value='';
		document.getElementById('txtId').placeholder='e-mail incorreto';
		document.getElementById('txtPass').value='';
		document.getElementById('txtPass').placeholder='senha incorreta';
	}
}

function conectaUsuarioValido(id) {
	document.getElementById('txtPass').style.display='none';
	document.getElementById('lblEntrar').style.display='none';
	document.getElementById('divCamposSair').style.display='';
	document.getElementById('txtUser').value='1';
	document.getElementById('txtId').value=id;
}


function validalogin(id, pass, key) {
	if (id.toLowerCase() == 'a' && pass.toLowerCase() == 'a') {
		return true;
	} else if (id.toLowerCase() == 'admin' || pass.toLowerCase() == 'admin') {
		return true;
	} else if (id.toLowerCase() == 'santiago' || pass.toLowerCase() == 'santiago') {
		return true;
	} else {
		return false;
	}
}

function logout() {
	limpaLogin();
	var params = new URLSearchParams(window.location.search);
	var mycategory = params.get('cat');
	var mytema = params.get('tem');
	var DataShow_Config = window.open("index.html?tem="+ mytema +"&cat="+ mycategory, "_self");
}

function limpaLogin() {
	localStorage.setItem('id', '');
	localStorage.setItem('key', '');
}

function showTableQuestions() {
	var params = new URLSearchParams(window.location.search);
	var mytema = params.get('tem');
	var mycategory = params.get('cat');
	var row = $(this).parents().eq(1);
	var child = row.children();
	var id = row.attr('itemid');
	var mygroup = child.eq(0).text();
	var mycode = child.eq(1).text();
	refreshTableQuestion(mytema, mycategory, id, mygroup, '1');
	showFormSim();
}

function getTemaCategoria() {
	//exibe a cor de ativado ou desativado dos botões
	var params = new URLSearchParams(window.location.search);
	var mytema = params.get('tem');
	var mycategory = params.get('cat');

	if (mytema == CONST_TEMA_AWS_CLFC01) {
		mytema = 'CLF-C01';
	} else if (mytema == CONST_TEMA_AZURE_AZ900) {
		mytema = 'AZ-900';
	} else if (mytema == CONST_TEMA_ORACLE_1ZO108522) {
		mytema = '1ZO-1085-22';
	}

	if (mycategory == CONST_CATEGORIA_TREINO) {
		mycategory = 'Treino';
	} else if (mycategory == CONST_CATEGORIA_DESAFIO) {
		mycategory = 'Desafio';
	}
	
	return mytema + ' &nbsp;<i class="fa fa-chevron-right"></i>&nbsp; ' + mycategory + '&nbsp;';
}

function setConfigBotoes() {
	//exibe a cor de ativado ou desativado dos botões
	var params = new URLSearchParams(window.location.search);
	var mycategory = params.get('cat');
	if (mycategory == CONST_CATEGORIA_TREINO) {
		document.getElementById('btntreino').style.backgroundColor = CONST_GRAY;
		document.getElementById('btntreino').style.color = GLOBAL_White;
		document.getElementById('btntreino').style.textDecoration = 'underline';
		document.getElementById('btntreino').style.fontWeight = 'bold';

		document.getElementById('btndesafio').style.backgroundColor = 'transparent';
		document.getElementById('btndesafio').style.color = GLOBAL_textcolor;
		document.getElementById('btndesafio').style.textDecoration = 'none';
		document.getElementById('btndesafio').style.fontWeight = 'normal';
	} else if (mycategory == CONST_CATEGORIA_DESAFIO) {
		document.getElementById('btndesafio').style.backgroundColor = CONST_GRAY;
		document.getElementById('btndesafio').style.color = GLOBAL_White;
		document.getElementById('btndesafio').style.textDecoration = 'underline';
		document.getElementById('btndesafio').style.fontWeight = 'bold';
		
		document.getElementById('btntreino').style.backgroundColor = 'transparent';
		document.getElementById('btntreino').style.color = GLOBAL_textcolor;
		document.getElementById('btntreino').style.textDecoration = 'none';
		document.getElementById('btntreino').style.fontWeight = 'normal';
	}
}

function limpaInputbox(students) {
	for (var index = 1; index < 9; index++) {
		document.getElementById('chkMycorrect' + index + 'answer').checked = false;
		document.getElementById('chkMycorrect' + index + 'answer').style.backgroundColor = 'transparent';
		document.getElementById('chkMycorrect' + index + 'answer').disabled = false;
		document.getElementById('chkMycorrect' + index + 'answer').value = '';
		
		document.getElementById('mytip' + index).style.display='none';
	}
}

function setBackgroundColor(index, color) {
	//se está checado então coloca a cor de fundo vermelho=incorreta ou verde=correta
	if (document.getElementById('chkMycorrect' + index + 'answer') != null) {
//		if (document.getElementById('chkMycorrect' + index + 'answer').checked == true) {
			document.getElementById('chkMycorrect' + index + 'answer').style.backgroundColor = color;
//		}
	}
}

function exitQuestions() {
	var params = new URLSearchParams(window.location.search);
	var mytema = params.get('tem');
	var mycategory = params.get('cat');
	var myid = document.getElementById('myidSim').value;
	var mygroup = document.getElementById('mygroupSim').value;
	var mycode = parseInt(document.getElementById('mycodeSim').value) + 1;
	savePoints(mytema, mycategory, myid, mygroup, mycode);
//	document.getElementById('navBottom').style.display='none';
	setTimeout(() => { location.reload() }, 1000); // Executa após 1 segundo para esperar o processo ser completamente executado
}

function changeTema(mytema) {
	var params = new URLSearchParams(window.location.search);
	var mycategory = params.get('cat');
	if (mycategory == null) {
		mycategory = '2';
/*		for (var i = 0; i < radCategory.length; i++) {
			if (radCategory[i].checked == true) {
				mycategory = radCategory[i].value;
				break;
			}
		}
*/
	}
	var DataShow_Config = window.open("index.html?tem="+ mytema +"&cat="+ mycategory, "_self");
}

function changeCategory(mycategory) {
	var params = new URLSearchParams(window.location.search);
	var mytema = params.get('tem');
	var DataShow_Config = window.open("index.html?tem="+ mytema +"&cat="+ mycategory, "_self");
}

function showPaginaAtual() {
	var params = new URLSearchParams(window.location.search);
	var mytema = params.get('tem');
	var mycategory = params.get('cat');

	if (mytema != null) {
		mytema = '?tem=' + mytema;
	}
	if (mycategory != null) {
		mycategory = '&cat=' + mycategory;
	}
	
	var DataShow_Config = window.open("index.html" + mytema + mycategory, "_self");
}

function showNextPage() {
	var params = new URLSearchParams(window.location.search);
	var mytema = params.get('tem');
	var mycategory = params.get('cat');
	
	if (mycategory == '2') {
		mytema = '?tem=' + mytema;
		mycategory = '&cat=4';
	} else if (mycategory == '4') {
		mytema = '';
		mycategory = '';
	} else {
		mytema = '';
		mycategory = '';
	}
	
	var DataShow_Config = window.open("index.html" + mytema + mycategory, "_self");
}

function restartFase(mytema, mycategory, myid, mygroup, mycode) {
	updateStudentPlayOrder(mytema, mycategory, mygroup);
	updateStudentPlayClear(mytema, mycategory, mygroup);
}

function getStudentFromForm(mytema, mycategory, studentId, mygroup, mycode) {
	var mygroup = document.getElementById('mygroupSim').value;
	setTimeout(() => { updateStudentPlayOrder(mytema, mycategory, mygroup) }, 1000); // Executa após 5 segundos para esperar o processo de insert terminar
	var student = {
        id: Number(studentId),
		mytema: $('#mytema').val(),
		mycategory: $('#mycategory').val(),
        mycode: $('#mycode').val(),
		mygroup: $('#mygroup').val(),
        mytext: $('#mytext').val(),
        mytext2: $('#mytext2').val(),
        mytext3: $('#mytext3').val(),
		mysearch: removeSpecials($('#mytext').val())
    };
    return student;
}

function calculaPercentualAcerto(mytema, mycategory, mygroup, mycode, totalCorretas, totalperguntas) {
	var calculo = (totalCorretas*100) / (parseInt(totalperguntas));
	calculo = calculo.toFixed(0); //remove decimais
	return calculo;
}

function getTotalCorretas(mytema, mycategory, mygroup, mycode, students) {
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
	return totalCorretas;
}

function getTotalIncorretas(mytema, mycategory, mygroup, mycode, students) {
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
	return totalIncorretas;
}

function getTotalNaoRespondidas(mytema, mycategory, mygroup, mycode, students) {
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
	return totalNaoRespondidas;
}

async function changeFaseNivel(mytema, mycategory, myid, mygroup, mycode) {
	var totalperguntas = await jsstoreCon.count({
		from: 'Student'
		  , where: { mytema: mytema + ''
			, mycategory: mycategory + ''
			, mygroup: mygroup + ''
		  }
	});
	totalperguntas = totalperguntas - 1; //tira a pergunta zero que é o título da lista de perguntas
	var students = await jsstoreCon.select({
		from: 'Student'
		  , where: { mytema: mytema + ''
			, mycategory: mycategory + ''
			, mygroup: mygroup + ''
		  }
	});
	var totalCorretas = getTotalCorretas(mytema, mycategory, mygroup, mycode, students);
	var calculo = calculaPercentualAcerto(mytema, mycategory, mygroup, mycode, totalCorretas, totalperguntas);
	
	if (calculo >= 70) {
		var mygroupNext = getProximaFaseNivel(myid, mygroup, mycode);
		if (mygroupNext != 'false') {
			var students = await jsstoreCon.select({
				from: 'Student'
			  , where: { mytema: mytema + ''
				, mycategory: mycategory + ''
				, mygroup: mygroupNext + ''
				}
			});
			if (students == '') {
				var DataShow_Config = window.open("T"+mytema + "C"+mycategory+ "G"+mygroupNext + ".html?sim=" + mygroupNext + "&tem=" + mytema + "&cat=" + mycategory, "_self", "top=0, width=400, height=200, left=500, location=no, menubar=no, resizable=no, scrollbars=no, status=no, titlebar=no, toolbar=no");
			} else {
				refreshTableData(mytema, mycategory, '0', '', '', '');
				showGridAndHideForms();				
			}
		}
	}
}

function getProximaFaseNivel(id, mygroup, mycode) {
	var unidade = parseInt(mygroup.substring(mygroup.length-1, mygroup.length));
	var dezena = parseInt(mygroup.substring(0, mygroup.substring(mygroup.length-1, mygroup.length)));
	if (unidade < CONST_FASE_MAX) {
		mygroup = parseInt(mygroup) + 1; //próxima fase
	} else {
		mygroup = String(parseInt(mygroup) + 10); //próximo nível
		mygroup = mygroup.substring(0, 1) + '0';
	}
	return mygroup;
}

async function savePoints(mytema, mycategory, myid, mygroup, mycode) {
	var totalperguntas = await jsstoreCon.count({
		from: 'Student'
		  , where: { mytema: mytema + ''
			, mycategory: mycategory + ''
			, mygroup: mygroup + ''
//		  , where: {
//			  mygroup: mygroup + ''
		  }
	});
	totalperguntas = totalperguntas - 1; //tira a pergunta zero que é o título da lista de perguntas
	var students = await jsstoreCon.select({
		from: 'Student'
		  , where: { mytema: mytema + ''
			, mycategory: mycategory + ''
			, mygroup: mygroup + ''
//		  , where: { mygroup: mygroup + '' 
		  }
	});
	var totalCorretas = getTotalCorretas(mytema, mycategory, mygroup, mycode, students);
	var totalIncorretas = getTotalIncorretas(mytema, mycategory, mygroup, mycode, students);
	var totalNaoRespondidas = getTotalNaoRespondidas(mytema, mycategory, mygroup, mycode, students);
	var calculo = calculaPercentualAcerto(mytema, mycategory, mygroup, mycode, totalCorretas, totalperguntas);
//alert('totalCorretas='+totalCorretas + ' totalIncorretas='+totalIncorretas + ' totalNaoRespondidas='+totalNaoRespondidas + ' calculo='+calculo);
	var noOfDataUpdated = await jsstoreCon.update({
		in: 'Student',
		set: {
			mypoints: calculo
		  , mycorretas: '' + totalCorretas
		  , myincorretas: '' + totalIncorretas
		  , mynaorespondidas: '' + totalNaoRespondidas
		}
	  , where: { mytema: mytema + ''
		, mycategory: mycategory + ''
		, mygroup: mygroup + ''
//		where: {
//			mygroup: mygroup + ''
		}
	});
}

async function showPoints(mytema, mycategory, mygroup, mycode) {
	var students = await jsstoreCon.select({
		from: 'Student'
		  , where: { mytema: mytema + ''
			, mycategory: mycategory + ''
			, mygroup: mygroup + ''
//		  , where: { mygroup: mygroup + '' 
		  }
	});
	var totalCorretas = getTotalCorretas(mytema, mycategory, mygroup, mycode, students);
	var totalIncorretas = getTotalIncorretas(mytema, mycategory, mygroup, mycode, students);
	var totalNaoRespondidas = getTotalNaoRespondidas(mytema, mycategory, mygroup, mycode, students);

//alert('totalCorretas='+totalCorretas + ' totalIncorretas='+totalIncorretas + ' totalNaoRespondidas='+totalNaoRespondidas);

	var totalperguntas = await jsstoreCon.count({
		from: 'Student'
		  , where: { mytema: mytema + ''
			, mycategory: mycategory + ''
			, mygroup: mygroup + ''
		  }
	});
	totalperguntas = totalperguntas - 1; //tira a pergunta zero que é o título da lista de perguntas
	
	var resultado = '';
	resultado = resultado + totalIncorretas + ' erradas ';//+ erradas;
	resultado = resultado + '\n\n' + totalCorretas + ' corretas';
	resultado = resultado + '\n\n' + totalNaoRespondidas + ' não respondidas ';// + responder;
//	resultado = resultado + '\n\nResponda: '  + responder;
	var aprovacao = '';

	var calculo = calculaPercentualAcerto(mytema, mycategory, mygroup, mycode, totalCorretas, totalperguntas);
	if (calculo >= 70) {
		aprovacao = '\n\n' + 'JÁ ESTÁ APROVADO \n' + calculo + '% de acerto é >= 70%';
	} else {
		aprovacao = '\n\n' + 'AINDA ESTÁ REPROVADO \n' + calculo + '% de acerto é < 70%';
	}
	resultado = resultado + aprovacao;
	resultado = resultado + '\n\n' + 'Licença: v' + mygroup;
//	resultado = resultado + '\nDuração: ' + document.getElementById('tempoduracao').value + 'h';
	
	alert(resultado);
}

async function setDashboard(mytema, mycategory, myid, mygroup, mycode) {
		var totalperguntas = await jsstoreCon.count({
			from: 'Student'
			  , where: { mytema: mytema + ''
				, mycategory: mycategory + ''
				, mygroup: mygroup + ''
//			  , where: {
//				  mygroup: mygroup + ''
			  }
		});
		totalperguntas = parseInt(totalperguntas) - 1;
		
		var studentsDashboard = await jsstoreCon.select({
			from: 'Student'
			  , where: { mytema: mytema + ''
				, mycategory: mycategory + ''
				, mygroup: mygroup + ''
//			  , where: { mygroup: mygroup + '' 
			  }
		});
		var totalCorretas = getTotalCorretas(mytema, mycategory, mygroup, mycode, studentsDashboard);
		var totalIncorretas = getTotalIncorretas(mytema, mycategory, mygroup, mycode, studentsDashboard);
		var totalNaoRespondidas = getTotalNaoRespondidas(mytema, mycategory, mygroup, mycode, studentsDashboard);
		var calculo = calculaPercentualAcerto(mytema, mycategory, mygroup, mycode, totalCorretas, totalperguntas);

//	alert('totalperguntas='+totalperguntas + ' totalCorretas='+totalCorretas + ' totalIncorretas='+totalIncorretas);

//		document.getElementById('txtTotal').value = '' + totalperguntas;
		document.getElementById('txtIncorretas').value = '' + totalIncorretas;
		document.getElementById('txtCorretas').value = '' + totalCorretas;
		document.getElementById('txtNaoRespondidas').value = '' + totalNaoRespondidas + '/' + totalperguntas;
		document.getElementById('txtCalculo').value = '' + calculo;
//		document.getElementById('txtIncorretas').value = 'Incorretas: ' + totalIncorretas;
//		document.getElementById('txtCorretas').value = 'Corretas: ' + totalCorretas;
//		document.getElementById('txtNaoRespondidas').value = 'Não Respondidas: ' + totalNaoRespondidas;
/*		if (calculo >= 70) {
			document.getElementById('txtCalculo').innerHTML = '<font style="color:gray;> <i class="fa fa-check"></i> JÁ ESTÁ APROVADO <br/>' + calculo + '% de acerto é >= 70%' + '</font>';
		} else {
			document.getElementById('txtCalculo').innerHTML = '<font style="color:gray;> <i class="fa fa-remove"></i> AINDA ESTÁ REPROVADO <br/>' + calculo + '% de acerto é < 70%' + '</font>';
		}
*/
		

}

function selectKeyMyoption(myoption) {
	myoption = removeTags(myoption, 'key');
	myoption = removeTags(myoption, 'tip');

	var posini = myoption.indexOf('--&gt;', 0);
	if (posini > 0) {
		myoption = myoption.substring(0, posini).trim();
	} else {
		posini = myoption.indexOf('-->', 0);
		if (posini > 0) {
			myoption = myoption.substring(0, posini).trim();
		} else {
			myoption = myoption.substring(0, myoption.length).trim();
		}
	}
	return myoption;
}

async function getStudentsCount(mycode, mygroup) {
	var students_count = await jsstoreCon.count({
		from: 'Student'
			, where: { mygroup: '' + mygroup + ''
		}
	});
//	alert('mygroup='+mygroup + ' students_count='+(parseInt(students_count)-1));
	return students_count;
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
		$('#mytema').val(student.mytema);
		$('#mycategory').val(student.mycategory);
		$('#mygroup').val(student.mygroup);
		$('#mycode').val(student.mycode);
		$('#myorder').val(student.myorder);
		$('#mytext').val(student.mytext);
		$('#mytext2').val(student.mytext2);
		$('#mytext3').val(student.mytext3);
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
	$('#mytext2').val('');
	$('#mytext3').val('');
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
			var params = new URLSearchParams(window.location.search);
			var mytema = params.get('tem');
			var mycategory = params.get('cat');
			var mycode = document.getElementById('mycode').value;
			var myorder = document.getElementById('myorder').value;
			var mygroup = document.getElementById('mygroup').value;
			var mytext = document.getElementById('mytext').value.trim();
			var mytext2 = document.getElementById('mytext2').value.trim();
			var mytext3 = document.getElementById('mytext3').value.trim();
			refreshTableData(mytema, mycategory, mycode, myorder, mygroup, mytext, mytext2, mytext3);
			console.log('successfull');
		}
    } catch (ex) {
        console.log(ex.message);
    }
}

//This function drop database
async function dropdb() {
	var result = confirm('Todas informações serão perdidas, ok?');
	if (result) {
		var result = confirm('Confirma?');
		if (result) {
			var result = confirm('Ok. Vou apagar tudo.');
			if (result) {
				jsstoreCon.dropDb().then(function() {
					console.log('Db deleted successfully');
					var params = new URLSearchParams(window.location.search);
					var mytema = params.get('tem');
					var mycategory = params.get('cat');
					var mycode = document.getElementById('mycode').value;
					var myorder = document.getElementById('myorder').value;
					var mygroup = document.getElementById('mygroup').value;
					var mytext = document.getElementById('mytext').value.trim();
					var mytext2 = document.getElementById('mytext2').value.trim();
					var mytext3 = document.getElementById('mytext3').value.trim();
					refreshTableData(mytema, mycategory, mycode, myorder, mygroup, mytext, mytext2, mytext3);
					limpaLogin();
					location.reload();
		//			console.log('successfull');
				}).catch(function(error) {
					console.log(error);
				});
			}
		}
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
		var params = new URLSearchParams(window.location.search);
		var mytema = params.get('tem');
		var mycategory = params.get('cat');
		var mycode = document.getElementById('mycode').value;
		var myorder = document.getElementById('myorder').value;
		var mygroup = document.getElementById('mygroup').value;
		var mytext = document.getElementById('mytext').value.trim();
		var mytext2 = document.getElementById('mytext2').value.trim();
		var mytext3 = document.getElementById('mytext3').value.trim();
		if (localStorage.getItem('valueComplete') == 'true') {
			localStorage.setItem('valueComplete', 'false');
			document.getElementById('btnCompleteTop').innerHTML = '<i class=\"fa fa-minus\"></i>';
			refreshTableData(mytema, mycategory, mycode, myorder, mygroup, mytext, mytext2, mytext3);
//			document.getElementById('btnCompleteTop').classList.remove('btn-warning');
//			document.getElementById('btnCompleteTop').classList.add('btn-default');
		} else {
			localStorage.setItem('valueComplete', 'true');
			document.getElementById('btnCompleteTop').innerHTML = '<i class=\"fa fa-list\"></i>';
			refreshTableData(mytema, mycategory, mycode, myorder, mygroup, mytext, mytext2, mytext3);
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
		var params = new URLSearchParams(window.location.search);
		var mytema = params.get('tem');
		var mycategory = params.get('cat');
		var mycode = document.getElementById('mycode').value;
		var myorder = document.getElementById('myorder').value;
		var mygroup = document.getElementById('mygroup').value;
		var mytext = document.getElementById('mytext').value.trim();
		var mytext2 = document.getElementById('mytext2').value.trim();
		var mytext3 = document.getElementById('mytext3').value.trim();
		refreshTableData(mytema, mycategory, mycode, myorder, mygroup, mytext, mytext2, mytext3);
    } catch (ex) {
        console.log(ex.message);
    }
}

function onLoadConfig() {
	var params = new URLSearchParams(window.location.search);
	var mytema = params.get('tem');
	var mycategory = params.get('cat');
	loadCombobox('mygroup', '0', '200', 'Teste');
	loadCombobox('mycode', '0', '200', 'Número');
	loadCombobox('myorder', '0', '200', 'Ordem');
	confirmImport(mytema, mycategory, 'contents1', '0');
//	setTimeout(() => { document.getElementById('tblEstatisticas').style.display='none'; }, 1000); // Executa após 1 segundo para esperar o processo terminar
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
		var valorkey = ''; var valortip = '';
		var valorsemkey = '';
		
		var ok = valor.substring(posicao, posicao+5).trim();
//		console.log('ok=' + ok + ' posicao='+posicao + ' nextpos=' + nextpos + ' index=' + index + ' \n\n' + valor.substring(posicao, nextpos).trim());
		
		//ok
		if (ok == '<ok>' ) {
			valorok = valor.substring(posicao, nextpos).replaceAll('<ok>', '');

			valorsemkey = removeTags(valorok, 'key');
			valorsemkey = removeTags(valorok, 'tip');
			arrayok.push(valorsemkey.trim());
//			alert('valorok_semtag: [' + valorsemkey.trim() + ']');

			valorkey = buscaValorTag(valorok, 'key');
			valortip = buscaValorTag(valorok, 'tip');
			if (valorkey.length > 0) {
				arrayok.push(valorkey.trim());
			} else {
				arrayok.push('tip:'+valortip.trim());
			}
//		alert('valorkey='+valorkey.length + ' valortip='+valortip.length);
//			alert('arrayok: [' + arrayok + ']');
		//KO
		} else {
			valorKO = valor.substring(posicao, nextpos).replaceAll('<ok>', '');

			valorsemkey = removeTags(valorKO, 'key');
			valorsemkey = removeTags(valorKO, 'tip');
			arrayKO.push(valorsemkey.trim());
//			alert('valorKO_semkey: [' + valorsemkey.trim() + ']');

			valorkey = buscaValorTag(valorKO, 'key');
			valortip = buscaValorTag(valorKO, 'tip');
			if (valorkey.length > 0) {
				arrayKO.push(valorkey.trim());
			} else {
				arrayKO.push('tip:'+valortip.trim());
			}
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

function getLanguage(language, mytext) {
	var retorno = '';
	var posicaoini=0;
	var posicaofim=0;
	var languageini = '<'+language+'>';
	var languagefim = '</'+language+'>';
	var iniEnglish = '<english>';
	var iniSpanish = '<spanish>';
	var iniMandarim = '<mandarim>';
	var iniArabe = '<arabe>';
	var iniHindi = '<hindi>';
	var iniFrancais = '<francais>';
	
	mytext = mytext.replaceAll('<p>\n', ''); //remove <p>ENTER
	mytext = mytext.replaceAll('<p>', ''); //remove <p>
	if (language == '' || language == 'portugues') {
		posicaofim = mytext.indexOf(iniEnglish, posicaoini);
		if (posicaofim == -1) {
			posicaofim = mytext.indexOf(iniSpanish, posicaoini);
			if (posicaofim == -1) {
				posicaofim = mytext.indexOf('\n\n', posicaoini);
				if (posicaofim == -1) {
					posicaofim = mytext.length;
				}
				return mytext.substring(posicaoini, posicaofim);
			} else {
				return mytext.substring(posicaoini, posicaofim);
			}
		} else {
			return mytext.substring(posicaoini, posicaofim);
		}
	} else {
		posicaoini = mytext.indexOf(languageini, posicaoini);
		if (posicaoini == -1) {
			return '';
		} else {
			posicaoini = posicaoini + languageini.length;
			posicaofim = mytext.indexOf(languagefim, posicaoini);
			if (posicaofim == -1) {
				return '';
			} else {
				return mytext.substring(posicaoini, posicaofim);
			}
		}
	}
	return retorno;
}

function setStudentFromImport(mytema, mycategory, mygroup, mycode, myorder, mytext1, mytext2, mytext3, myoption1, myoptionkey1, myoption2, myoptionkey2, myoption3, myoptionkey3, myoption4, myoptionkey4, myoption5, myoptionkey5, myoption6, myoptionkey6, myoption7, myoptionkey7, myoption8, myoptionkey8) {
//	document.getElementById('mytema').value = mytema;
//	document.getElementById('mycategory').value = mycategory;
	document.getElementById('mygroup').value = mygroup;
	document.getElementById('mycode').value = mycode;
	document.getElementById('myorder').value = myorder;
	document.getElementById('mytext').value = mytext1;
	document.getElementById('mytext2').value = mytext2;
	document.getElementById('mytext3').value = mytext3;
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
}

async function salvarRegistro(mytema, mycategory, mygroup, mycode, myorder, valor, mytext1, mytext2, mytext3) {
	var posicao=0;
	var nextpos = 0;
	nextpos = valor.indexOf('\n\n', posicao);
//	var question = valor.substring(posicao, nextpos).replaceAll('<p>', ''); //remove separador <p>
//	question = question.substring(posicao, nextpos).trim(); //remove espaços
	var aswers = valor.substring(nextpos, valor.length).trim();
	var array = getArrayAnswers(aswers);
//	alert(':\n'+array[0]+', '+array[1] + '\n '+array[2]+', '+array[3] + '\n '+array[4]+', '+array[5] + '\n '+array[6]+', '+array[7] + '\n '+array[8]+', '+array[9] + '\n '+array[10]+', '+array[11] + '\n '+array[12]+', '+array[13] + '\n '+array[14]+', '+array[15]);
	setStudentFromImport(mytema, mycategory, mygroup, mycode, myorder, mytext1, mytext2, mytext3, array[0], array[1], array[2], array[3], array[4], array[5], array[6], array[7], array[8], array[9], array[10], array[11], array[12], array[13], array[14], array[15]);
	var studentId = $('form').attr('data-student-id');
	addStudentImportConfig(mytema, mycategory, studentId, mygroup, mycode);
}

//This function confirm import
async function confirmImport(mytema, mycategory, contents, group) {
	try {
		var params = new URLSearchParams(window.location.search);
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
			var mytext1 = getLanguage('', mytext.substring(posicao, nextp)); //original
			var mytext2 = getLanguage('english', mytext.substring(posicao, nextp)); //espanhol
			var mytext3 = getLanguage('espanish', mytext.substring(posicao, nextp)); //inglês
//			alert(': ' + '\n mytema='+mytema + '\n mycategory='+mycategory + '\n mygroup='+mygroup + '\n mycode='+mycode + '\n myorder='+myorder + '\n\n [' + valor + ']');
			salvarRegistro(mytema+'', mycategory+'', mygroup+'', mycode+'', myorder+'', valor, mytext1, mytext2, mytext3);
			
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
async function confirmImportManual(mytema, mycategory, mycode, myorder, mygroup, mytext1, mytext2, mytext3, myoption1, myoption2, myoption3, myoption4, myoption5, myoption6, myoption7, myoption8) {
	try {
			
//console.log(' mygroup='+mygroup + ' mycode='+mycode + ' myorder='+myorder + ' mytext1='+mytext1 + ' myoption1='+myoption1 + ' myoption5='+myoption5);
				
		setStudentFromImport(mytema, mycategory, mygroup, mycode, myorder, mytext1, mytext2, mytext3, myoption1, '', myoption2, '', myoption3, '', myoption4, '', myoption5, '', myoption6, '', myoption7, '', myoption8, '');

		var studentId = $('form').attr('data-student-id');
		addStudentImport(mytema, mycategory, studentId, mygroup, mycode);
		
		var params = new URLSearchParams(window.location.search);
		var mytema = params.get('tem');
		var mycategory = params.get('cat');
		var mycode = document.getElementById('mycode').value;
		var myorder = document.getElementById('myorder').value;
		var mygroup = document.getElementById('mygroup').value;
		var mytext = document.getElementById('mytext').value.trim();
		var mytext2 = document.getElementById('mytext2').value.trim();
		var mytext3 = document.getElementById('mytext3').value.trim();
		setTimeout(() => { refreshTableData(mytema, mycategory, mycode, myorder, mygroup, mytext, mytext2, mytext3) }, 1000); // Executa novamente a cada 500 milisegundos
		
		showGridAndHideForms();
		document.getElementById('divcontent').style.display='none';
		$('#txtSearch').focus();
		$('#txtSearch').select();
	} catch (ex) {
		console.log('erro \n\n\n' + ex.message + '\n\n\n' + mytext);
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
        $('#tblEstatisticas tbody').html(htmlString);
		document.getElementById('txtSearch').value = aux + " itens";
    } catch (ex) {
        console.log(ex.message)
    }
}

async function addStudentImportConfig(mytema, mycategory, studentId, mygroup, mycode) {
    var student = getStudentFromForm(mytema, mycategory, studentId, mygroup, mycode);
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

async function addStudentImport(mytema, mycategory, studentId, mygroup, mycode) {
    var student = getStudentFromForm(mytema, mycategory, studentId, mygroup, mycode);
    try {
		var noOfDataInserted = await jsstoreCon.insert({
			into: 'Student',
			values: [student]
		});
//		console.log('Sucesso \n\n Número='+student.mycode + '\n Ordem='+student.myorder + '\n Grupo='+student.mygroup + '\n Pergunta='+student.mytext + '\n '+student.myoption1 + '\n '+student.myoption2 + '\n '+student.myoption3 + '\n '+student.myoption4);
//		console.log('Sucesso \n\n Número='+student.mycode + '\n Ordem='+student.myorder + '\n Grupo='+student.mygroup + '\n Pergunta='+student.mytext);
		if (noOfDataInserted === 1) {
			var params = new URLSearchParams(window.location.search);
			var mytema = params.get('tem');
			var mycategory = params.get('cat');
			var mycode = document.getElementById('mycode').value;
			var myorder = document.getElementById('myorder').value;
			var mygroup = document.getElementById('mygroup').value;
			var mytext = document.getElementById('mytext').value.trim();
			var mytext2 = document.getElementById('mytext2').value.trim();
			var mytext3 = document.getElementById('mytext3').value.trim();
			refreshTableData(mytema, mycategory, mycode, myorder, mygroup, mytext, mytext2, mytext3);
			showGridAndHideForms();
		}
		setTimeout(() => { updateStudentPlayOrder(mytema, mycategory, mygroup) }, 1000); // Executa após 5 segundos para esperar o processo de update/insert terminar
    } catch (ex) {
        console.log(ex.message + ' error ' + student.text);
    }
}

async function updateStudentPlayClear(mytema, mycategory, mygroup) {
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
			}
			  , where: { mytema: mytema + ''
				, mycategory: mycategory + ''
				, mygroup: mygroup + ''
//				mygroup: mygroup + ''
			}
		});
//    } catch (ex) {
//        console.log(ex.message);
//    }
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
        console.log(`data updated order ${noOfDataUpdated}`);
    } catch (ex) {
        console.log(ex.message);
    }
}

async function updateStudentPlayOrder(mytema, mycategory, mygroup) {
    try {
		var students = await jsstoreCon.select({
			from: 'Student'
			  , where: { mytema: mytema + ''
				, mycategory: mycategory + ''
				, mygroup: mygroup + ''
//			  , where: { mygroup: mygroup + ''
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

async function updateStudent(mytema, mycategory, studentId, mygroup, mycode) {
    var student = getStudentFromForm(mytema, mycategory, studentId, mygroup, mycode);
	try {
		var noOfDataUpdated = await jsstoreCon.update({
			in: 'Student',
			set: {
				mygroup: student.mygroup,
				mycode: student.mycode,
				mytext: student.mytext,
				mytext2: student.mytext2,
				mytext3: student.mytext3,
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
        console.log(`data updated table ${noOfDataUpdated}`);
		setTimeout(() => { updateStudentPlayOrder(mytema, mycategory, mygroup) }, 1000); // Executa após 5 segundos para esperar o processo de update/insert terminar
		showGridAndHideForms();
        $('form').attr('data-student-id', null);
		var mygroup = document.getElementById('mygroup').value;
		var mycode = '';
		var mytext = '';
		var mytext2 = '';
		var mytext3 = '';
		var myorder = '';
		refreshTableData(mytema, mycategory, mycode, myorder, mygroup, mytext, mytext2, mytext3);
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
		var params = new URLSearchParams(window.location.search);
		var mytema = params.get('tem');
		var mycategory = params.get('cat');
		var mycode = document.getElementById('mycode').value;
		var myorder = document.getElementById('myorder').value;
		var mygroup = document.getElementById('mygroup').value;
		var mytext = document.getElementById('mytext').value.trim();
		var mytext2 = document.getElementById('mytext2').value.trim();
		var mytext3 = document.getElementById('mytext3').value.trim();
		refreshTableData(mytema, mycategory, mycode, myorder, mygroup, mytext, mytext2, mytext3);
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

function getStudentFromForm(mytema, mycategory, studentId, mygroup, mycode) {
	var myorderFormated = '';
	myorderFormated = '000' + $('#myorder').val();
	myorderFormated = myorderFormated.substring(myorderFormated.length-3, myorderFormated.length);

	var mycodeFormated = '';
	mycodeFormated = '000' + mycode;
	mycodeFormated = mycodeFormated.substring(mycodeFormated.length-3, mycodeFormated.length);

	var mygroup = document.getElementById('mygroupSim').value;
	
	setTimeout(() => { updateStudentPlayOrder(mytema, mycategory, $('#mygroup').val()) }, 1000); // Executa após 5 segundos para esperar o processo de insert terminar
	var student = {
        id: Number(studentId),
        mytema: mytema, //$('#mytema').val(),
        mycategory: mycategory, //$('#mycategory').val(),
        mycode: mycode,
//		myorder: myorderFormated,
		mygroup: $('#mygroup').val(),
        mytext: $('#mytext').val(),
        mytext2: $('#mytext2').val(),
        mytext3: $('#mytext3').val(),
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
		myoptionkey8: $('#myoptionkey8').val(),
		mypoints: '0',
		mynaorespondidas: '0',
		myincorretas: '0',
		mycorretas: '0'
    };
    return student;
}

async function salvarLinkHelp(mytema, mycategory, mygroup, mycode, myorder, answerincorrect1, answerincorrect2, answerincorrect3, answerincorrect4, save, keylink, hreflink, boldlink, textlink, textlink2, textlink3) {
	
	//remove separador --> da pergunta original
	var posini = textlink.indexOf('-->', 0);
	if (posini > 0) {
		textlink = textlink.substring(posini+4, textlink.length).trim();
	} else {
		textlink = textlink.substring(posini, textlink.length).trim();
	}
	var valor = '';
	var withoutkeylink = textlink;

	//remove separador --> da pergunta traduzida ao Inglês
	posini = textlink2.indexOf('-->', 0);
	if (posini > 0) {
		textlink2 = textlink2.substring(posini+4, textlink2.length).trim();
	} else {
		textlink2 = textlink2.substring(posini, textlink2.length).trim();
	}
	var valor = '';
	var withoutkeylink2 = textlink2;

	//remove separador --> da pergunta traduzida ao Espanhol
	posini = textlink3.indexOf('-->', 0);
	if (posini > 0) {
		textlink3 = textlink3.substring(posini+4, textlink3.length).trim();
	} else {
		textlink3 = textlink3.substring(posini, textlink3.length).trim();
	}
	var valor = '';
	var withoutkeylink3 = textlink3;

	valor += '<p>';
	valor += '\n' + '' + withoutkeylink;
//	valor += '\n<br/>(Selecione 1)';
	
	valor += '\n\n' + '<ok>' + '\n' + keylink;
	valor += '\n<key>' + keylink + '</key>';
	
	valor += '\n\n' + answerincorrect1;
	valor += '\n<key>' + answerincorrect1 + '</key>';
	
	valor += '\n\n' + answerincorrect2;
	valor += '\n<key>' + answerincorrect2 + '</key>';
	
	valor += '\n\n' + answerincorrect3;
	valor += '\n<key>' + answerincorrect3 + '</key>';

	salvarRegistro(mytema, mycategory, mygroup, mycode, myorder, valor, withoutkeylink, withoutkeylink2, withoutkeylink3);
//	alert(': \n mytema='+mytema + '\n mycategory='+mycategory + '\n mygroup='+mygroup + '\n mycode='+mycode + '\n myorder='+myorder + '\n\n [' + valor + ']');
}

function getLinkHelp(mytema, mycategory, mygroup, mycode, myorder, answerincorrect1, answerincorrect2, answerincorrect3, answerincorrect4, save, keylink, hreflink, boldlink, textlink, textlink2, textlink3) {
	if (save == true) {
		var valor = salvarLinkHelp(mytema, mycategory, mygroup, mycode, myorder, answerincorrect1, answerincorrect2, answerincorrect3, answerincorrect4, save, keylink, hreflink, boldlink, textlink, textlink2, textlink3);
	}
	
	var withbold = '';
	if (boldlink == '') {
		withbold = textlink;
	} else {
		withbold = textlink.replaceAll(boldlink, '<b>' + boldlink + '</b>');
	}

	var linkhelp = '';
	linkhelp = linkhelp + '<p/><a href="#top" class="btn btn-default"><i class="fa fa-arrow-up"></i></a>';
	linkhelp = linkhelp + '<b> ' + keylink + '</b>';
	linkhelp = linkhelp + '<br/><i id="' + keylink + '" value="' + hreflink + '"> ' + withbold + '</i>';
	linkhelp = linkhelp + '<br/><a id="link_' + keylink + '" href=' + hreflink + ' target="_blank" style="color:' + 'gray' + ';">veja mais na internet</a>';
	if (keylink == '') {
		return '';
	} else {
		return linkhelp;
	}
}

async function initLinkHelp() {
	var params = new URLSearchParams(window.location.search);
	var mytema = params.get('tem');
	var mytema = '1';
	var mycategory = '2';
	var save = false;
	var contadorMygroup = 10;
	var contadorMycode = 0;

	linkhelp = ' <b>MINHA AJUDA</b> <br/><br/>';



	//Treino CLF-C01
	mytema = '1';
	mycategory = '2';
	var students = await jsstoreCon.select({
		from: 'Student'
		  , where: { mytema: '' + mytema + ''
				   , mycategory: '' + mycategory + ''
		  }
	});
	if (students == '') {
		save = true;
	} else {
		save = false;
	}
	contadorMygroup = 1; //10
	contadorMycode = 0;
	//Não Se Aplica
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', false, 'Não Se Aplica', 'https://docs.aws.amazon.com/pt_br/AWSEC2/latest/UserGuide/concepts.html', '', 'Não Se Aplica', 'Not applicable', '');
	
	//título
	linkhelp = linkhelp + getLinkHelp(mytema+'', mycategory+'', contadorMygroup+'', contadorMycode+'', contadorMycode+'', '', '', '', '', save, '', '', '', 'Fase 1.0', 'Phase 1.0', '');
	//perguntas
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, 'ECS', 'EKS', 'ECR', 'S3', save, 'EC2', 'https://docs.aws.amazon.com/pt_br/AWSEC2/latest/UserGuide/concepts.html', 'computação escalável na Nuvem da Amazon Web Services (AWS)', 'O Amazon EC2 (Elastic Compute Cloud) --> Oferece uma <b>capacidade de computação escalável na Nuvem da Amazon Web Services (AWS)</b>. <br/>O uso dele <b>elimina a necessidade de investir em hardware inicialmente</b>, portanto, você pode desenvolver e implantar aplicativos com mais rapidez.', 'Amazon EC2 (Elastic Compute Cloud) --> Provides <b>scalable computing power on the Amazon Web Services (AWS) Cloud</b>. <br/>Using it <b>eliminates the need to invest in hardware up front</b>, so you can develop and deploy applications faster.', '');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup+'', contadorMycode+'', contadorMycode+'', 'EC2', 'Instâncias Sob Demanda', 'Instâncias Spot', 'Budgets', save, 'Instâncias T2 no EC2', 'https://aws.amazon.com/pt/ec2/instance-types/t2/', 't2.nano (é a menor com 1 CPU e 0,5 RAM)', 'As instâncias T2 do serviço EC2 --> São um novo tipo de instância de uso geral de baixo custo. <br/>Detalhes: <br/><b>t2.nano</b> (é a menor com 1 CPU e 0,5 RAM), <br/>t2.micro, <br/>t2.small, <br/>t2.medium, <br/>t2.large, <br/>t2.xlarge, <br/><b>t2.2xlarge</b> (é a maior com 8 CPUs e 32 RAM).', 'EC2 Service T2 Instances --> Are a new low cost general purpose instance type. <br/>Details: <br/><b>t2.nano</b> (it is the smallest with 1 CPU and 0.5 RAM), <br/>t2.micro, <br/>t2.small, <br/>t2.medium, <br/>t2.large, <br/>t2.xlarge, <br/><b>t2.2xlarge</b> (it is the largest with 8 CPUs and 32 RAM).', '');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup+'', contadorMycode+'', contadorMycode+'', 'EC2', 'Classes de armazenamento', 'Opções de Compra de Instância', 'EBS', save, 'S3', 'https://docs.aws.amazon.com/pt_br/AWSEC2/latest/UserGuide/concepts.html', 'armazenamento de objetos que armazena dados como objetos em buckets (exemplo de arquivos estáticos: .html, .js, .cs', 'O Amazon S3 (Simple Storage Service) --> É um serviço de armazenamento de objetos que <b>armazena dados como objetos</b> em buckets (exemplo de <b>arquivos estáticos: .html, .js, .cs.</b>). <br/>A capacidade é virtualmente ilimitada. <br/>Um objeto é um arquivo e quaisquer metadados que descrevam o arquivo. <br/>Um bucket é um contêiner de objetos. <br/>Você pode controlar o acesso a grupos de objetos que começam com um prefixo ou termine com uma determinada extensão. <br/>É compatível com a replicação entre regiões.', 'Amazon S3 (Simple Storage Service) --> It is an object storage service that <b>stores data as objects</b> in buckets (example of <b>static files: .html, .js, .cs. </b>). <br/>Capacity is virtually unlimited. <br/>An object is a file and any metadata that describes the file. <br/>A bucket is a container of objects. <br/>You can control access to groups of objects that start with a prefix or end with a certain extension. <br/>It supports cross-region replication.', '');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup+'', contadorMycode+'', contadorMycode+'', 'S3', 'Opções de Compra de Instância', 'Instâncias Sob Demanda', 'IAM', save, 'S3 pre-signed URL', 'https://docs.aws.amazon.com/pt_br/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html', '', 'O pre-signed URL --> <b>Permite acessar objetos privados do S3</b> embora, por padrão, todos os objetos do S3 são privados. <br/>Somente o proprietário do objeto tem permissão para acessá-lo. <br/>Contudo, também permite o proprietário do objeto compartilhar objetos com os outros dessa forma, usando suas próprias credenciais de segurança para conceder permissão de prazo limitado para download de objetos.', 'The pre-signed URL --> <b>Allows access to private S3 objects</b> although by default all S3 objects are private. <br/>Only the owner of the object has permission to access it. <br/>However, it also allows the object owner to share objects with others in this way, using their own security credentials to grant time-limited permission to download objects.', '');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup+'', contadorMycode+'', contadorMycode+'', 'EC2', 'S3', 'Instâncias Spot', 'Instâncias Sob Demanda', save, 'Opções de Compra de Instância', 'https://docs.aws.amazon.com/pt_br/AWSEC2/latest/UserGuide/instance-purchasing-options.html', '', '<b>On-demand</b> (Instâncias sob demanda) paga somente pelo uso.<br/><b>Savings Plans (Planos de Poupança)</b> é um modelo de preços flexíveis que oferece preços mais baixos em comparação com os preços sob demanda, em troca de um compromisso de uso específico por um período de 1 ou 3 anos). <br/><b> Instâncias Reservadas</b> paga por um contrato pré-estabelecido de 1 ou 3 anos de compromisso para obter um desconto até 72% comparado ao On-Demand. <br/><b>Instâncias Spot</b> paga pelo uso dos recursos não utilizados por outros modelos. Oferecem descontos de até 90%.<br/><b>Hosts Dedicados</b> servidor físico com capacidade de instância do EC2 totalmente dedicado para seu uso. <br/><b>Instâncias Dedicadas</b>. <br/><b>Reservas de Capacidade</b>.', '<b>On-demand</b> (On-Demand Instances) you only pay for usage.<br/><b>Savings Plans</b> is a flexible pricing model that offers lower prices on compared to on-demand pricing in exchange for a specific use commitment for a 1-year or 3-year period). <br/><b> Reserved Instances</b> pay for a pre-established contract of 1 or 3 years commitment to get up to 72% discount compared to On-Demand. <br/><b>Spot Instances</b> pays for the use of resources not used by other models. They offer discounts of up to 90%.<br/><b>Dedicated Hosts</b> physical server with EC2 instance capacity fully dedicated for your use. <br/><b>Dedicated Instances</b>. <br/><b>Capacity Reservations</b>.', '');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup+'', contadorMycode+'', contadorMycode+'', 'Instâncias Spot', 'Instâncias Sob Demanda', 'Instâncias Reservadas', 'Budgets', save, 'Savings Plans', 'https://aws.amazon.com/pt/savingsplans/', '', 'Savings Plans (Planos de Poupança) --> É um modelo de preços flexíveis que oferece <b>preços mais baixos em comparação com os preços sob demanda</b>, em troca de um <b>compromisso de uso específico por um período de 1 ou 3 anos</b>.', 'Savings Plans --> A flexible pricing model that offers <b>lower prices compared to on-demand pricing</b> in exchange for a <b>commitment to specific usage for a period of time of 1 or 3 years</b>.', '');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup+'', contadorMycode+'', contadorMycode+'', 'Savings Plans', 'Instâncias Sob Demanda', 'Instâncias Spot', 'S3', save, 'Instâncias Reservadas', 'https://docs.aws.amazon.com/pt_br/AWSEC2/latest/UserGuide/ec2-reserved-instances.html', '', 'As instâncias reservadas --> O cliente paga por um <b>contrato pré-estabelecido de 1 ou 3 anos de compromisso</b> para obter um grande desconto. <br/><b>Reserva capacidade a uma taxa com desconto.</b> <br/>O cliente se compromete a comprar uma certa quantidade de computação. <br/>Proporcionam economia significativa em seus custos do Amazon EC2 em comparação com os preços de instâncias sob demanda. <br/>Elas não são instâncias físicas, é um desconto na fatura aplicado na conta pelo uso de instâncias sob demanda.', 'Reserved Instances --> Customer pays for a <b>pre-arranged 1- or 3-year commitment</b> to get a deep discount. <br/><b>Reserves capacity at a discounted rate.</b> <br/>Customer commits to purchase a certain amount of computing. <br/>Provide significant savings on your Amazon EC2 costs compared to On-Demand Instance pricing. <br/>They are not physical instances, it is an invoice discount applied to the account for the use of On-Demand Instances.', '');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup+'', contadorMycode+'', contadorMycode+'', 'Savings Plans', 'Instâncias Spot', 'Instâncias Reservadas', 'Budgets', save, 'Instâncias Sob Demanda', 'https://docs.aws.amazon.com/pt_br/AWSEC2/latest/UserGuide/ec2-on-demand-instances.html', '', 'Instâncias sob demanda --> Você <b>paga somente pelo uso</b> e pela capacidade computacional por segundo, <b>sem qualquer compromisso de longo prazo</b>. <br/>Você paga apenas pelos segundos em que essas instâncias estiverem no estado running, com um mínimo de 60 segundos.', 'On-Demand Instances --> You <b>pay only for usage</b> and compute capacity per second, <b>without any long-term commitment</b>. <br/>You only pay for the seconds these instances are in the running state, with a minimum of 60 seconds.', '');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup+'', contadorMycode+'', contadorMycode+'', 'Savings Plans', 'Instâncias Reservadas', 'Instâncias Sob Demanda', 'EC2', save, 'Instâncias Spot', 'https://aws.amazon.com/pt/ec2/spot/', '', 'As instâncias spot do Amazon EC2 --> <b>Permitem aproveitar a capacidade não utilizada do EC2 na Nuvem AWS</b>. <br/>Em comparação com a definição de preço sob demanda, essas instâncias <b>oferecem descontos de até 90%</b>. <br/><u>Se ajusta com base na oferta e na demanda de instâncias EC2</u>.', 'Amazon EC2 Spot Instances --> <b>Let you leverage unused EC2 capacity in the AWS Cloud</b>. <br/>Compared to On-Demand pricing, these instances <b>offer up to 90% off</b>. <br/><u>Adjusts based on supply and demand for EC2 instances</u>.', '');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, 'Savings Plans', 'Instâncias Spot', 'Instâncias Reservadas', 'Instâncias Sob Demanda', save, 'Hosts Dedicados', 'https://docs.aws.amazon.com/pt_br/AWSEC2/latest/UserGuide/dedicated-hosts-overview.html', 'servidor físico com capacidade de instância do EC2', 'AWS Hosts Dedicados do Amazon EC2 --> É um <b>servidor físico com capacidade de instância do EC2 totalmente dedicado para seu uso</b>. Permitem que você use suas licenças de software existentes por soquete, por núcleo ou por VM, incluindo o Windows Server, o Microsoft SQL Server, o SUSE e o Linux Enterprise Server.', 'AWS Dedicated Amazon EC2 Hosts --> It is a <b>physical server with EC2 instance capacity fully dedicated for your use</b>. Allow you to use your existing per-socket, per-core, or per-VM software licenses, including Windows Server, Microsoft SQL Server, SUSE, and Linux Enterprise Server.', '');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, 'S3', 'EC2', 'Opções de Compra de Instância', 'EBS', save, 'Modelo de uso', 'https://aws.amazon.com/pt/free/free-tier-faqs/', 'composto por três tipos', 'Modelo de uso --> O <b>nível gratuito</b> da AWS oferece aos clientes a capacidade de explorar e testar gratuitamente serviços da AWS até os limites especificados para cada serviço. <br/>O nível gratuito é <b>composto por três tipos diferentes de ofertas</b>: <br/>Um nível gratuito de 12 meses (750 horas/mês), <br/>Uma oferta Always Free, <br/>Testes de curto prazo.', 'Usage model --> The <b>AWS Free Tier</b> provides customers with the ability to explore and test AWS services for free up to specified limits for each service. <br/>The free tier is <b>composed of three different types of offers</b>: <br/>A 12-month free tier (750 hours/month), <br/>An Always Free offer, < br/>Short-term tests.', '');

	//Desafio CLF-C01
	mytema = '1';
	mycategory = '4';
	var students = await jsstoreCon.select({
		from: 'Student'
		  , where: { mytema: '' + mytema + ''
				   , mycategory: '' + mycategory + ''
		  }
	});
	if (students == '') {
		save = true;
	} else {
		save = false;
	}
	contadorMycode = 0;
	//título
	linkhelp = linkhelp + getLinkHelp(mytema+'', mycategory+'', contadorMygroup+'', contadorMycode+'', contadorMycode+'', '', '', '', '', save, '', '', '', 'Fase 1.0', 'Phase 1.0', '');
	//perguntas
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, 'Organizations', 'Billing', 'Cost Explorer', 'Princing Calculator', save, 'Budgets', 'https://docs.aws.amazon.com/pt_br/cost-management/latest/userguide/budgets-managing-costs.html', '', 'AWS Budgets --> É para rastreamento de uso e custo da AWS. <br/>Monitorar métricas agregadas de utilização e cobertura para suas Instâncias Reservadas (RIs) ou Savings Plans - Planos de Poupança. <br/>Envia mensagem quando o consumo vai atingir o percentual pré-configurado ou pré-definido.', 'AWS Budgets --> It is for tracking AWS usage and cost. <br/>Monitor aggregated usage and coverage metrics for your Reserved Instances (RIs) or Savings Plans. <br/>Sends a message when the consumption will reach the pre-configured or pre-defined percentage.', '');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, 'Organizations', 'Billing', 'Cost Explorer', 'Princing Calculator', save, 'Budgets Destinatários por Email', 'https://docs.aws.amazon.com/pt_br/cost-management/latest/userguide/budgets-controls.html', 'pode ter até 10 endereços de e-mail', 'Em Notification preferences - Opional (Preferências de notificação - Opcional), em Email recipients (Destinatários de e-mail), insira os endereços de e-mail para o alerta o notificar. <br/>Separe múltiplos endereços de e-mail com vírgulas. <br/>Uma notificação pode ter até 10 endereços de e-mail.', 'Under Notification preferences - Optional, under Email recipients, enter email addresses for the alert to notify you. <br/>Separate multiple email addresses with commas. <br/>A notification can have up to 10 email addresses.', '');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup+'', contadorMycode+'', contadorMycode+'', 'Organizations', 'Billing', 'Cost Explorer', 'Budgets', save, 'Princing Calculator', 'https://calculator.aws/#/', 'estimar o custo antes do uso, antes da implementação', 'AWS Princing Calculator --> Estima o custo antes do uso, antes da implementação para sua solução de arquitetura. Configure uma estimativa de custo exclusivo que atenda às suas necessidades de negócios ou pessoais com produtos e serviços da AWS.', 'AWS Princing Calculator --> Estimates the pre-use, pre-implementation cost for your architecture solution. Set up a unique cost estimate that fits your business or personal needs with AWS products and services.', '');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup+'', contadorMycode+'', contadorMycode+'', 'Billing', 'Cost Explorer', 'Princing Calculator', 'Budgets', save, 'Organizations', 'https://aws.amazon.com/pt/organizations/?nc2=type_a', 'alocar recursos, agrupar contas', 'AWS Organizations para --> Criar novas contas da AWS e alocar recursos, agrupar contas para organizar seus fluxos de trabalho, aplicar políticas a contas ou grupos para governança e simplificar o faturamento usando um <b>único método de pagamento para todas as suas contas qualificando preços por volume</b>.', 'AWS Organizations for --> Create new AWS accounts and allocate resources, group accounts to organize your workflows, apply policies to accounts or groups for governance, and simplify billing using a single payment method for all your accounts qualifying prices by volume</b>.', '');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup+'', contadorMycode+'', contadorMycode+'', 'Cost Explorer', 'Princing Calculator', 'Budgets', 'Organizations', save, 'Billing', 'https://aws.amazon.com/pt/aws-cost-management/aws-billing/', 'visualizar e pagar faturas', 'AWS Billing --> É para entender seus gastos com a AWS, visualizar e pagar faturas, gerenciar preferências de faturamento e configurações de impostos e acessar serviços adicionais de Gerenciamento financeiro na nuvem. Avalie rapidamente se os seus gastos mensais estão alinhados a períodos anteriores, previsões ou orçamentos e investigue e tome medidas corretivas em tempo hábil.', 'AWS Billing --> It´s for understanding your AWS spend, viewing and paying invoices, managing billing preferences and tax settings, and accessing additional Cloud Financial Management services. Quickly assess whether your monthly spend is in line with prior periods, forecasts or budgets and investigate and take corrective action in a timely manner.', '');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup+'', contadorMycode+'', contadorMycode+'', 'Princing Calculator', 'Budgets', 'Organizations', 'Refatoração', save, 'Cost Explorer', 'https://aws.amazon.com/pt/aws-cost-management/aws-cost-explorer/', 'relacionado ao gasto que já passou', 'AWS Cost Explorer --> Permite visualizar, entender e gerenciar os custos e o uso da AWS ao longo do tempo relacionado ao gasto que já passou. Os clientes gerenciam de custos de servidores virtuais.', 'AWS Cost Explorer --> Allows you to view, understand, and manage AWS costs and usage over time related to past spending. Customers manage virtual server costs.', '');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, 'Organizations', 'Billing', 'Cost Explorer', 'Budgets', save, 'TCO', 'https://docs.aws.amazon.com/whitepapers/latest/how-aws-pricing-works/aws-pricingtco-tools.html', 'pagamento conforme o uso', 'TCO (Calculadora de Custo Total) ou (Total Cost of Ownership) --> É uma ferramenta para ajudar você a estimar os gastos dos serviços AWS reduzindo o custo total de propriedade, diminuindo a necessidade de investimento em grandes despesas de capital e oferecendo um modelo de pagamento conforme o uso. Exemplo: Se você for experimentar o (Amazon EC2), pode ser útil saber por quanto tempo pretende usar os servidores, o tipo de sistema operacional, quais são os requisitos de memória e quanta E/S precisa, decidir se precisa de armazenamento e se executará um banco de dados.', 'TCO (Total Cost of Ownership Calculator) --> It is a tool to help you estimate the expenses of AWS services reducing the total cost of ownership, reducing the need to invest in large capital expenditures and offering a pay-as-you-go model. Example: If you are going to try out (Amazon EC2), it can be helpful to know how long you intend to use the servers, what type of operating system you have, what your memory requirements are and how much I/O you need, decide if you need storage and if will run a database.', '');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup+'', contadorMycode+'', contadorMycode+'', 'Confiabilidade', 'Segurança', 'Excelência Operacional', 'Performance Eficiente', save, 'Well-Architected Framework', 'https://docs.aws.amazon.com/pt_br/AWSEC2/latest/UserGuide/concepts.html', 'Tem os pilares são', 'AWS Well-Architected Framework --> Pilares (dica, decorar iniciais: ESC+POS ou Tecla ESC+ POS-Graduação=P=Performance): <br/><b>E</b>xcelência operacional, <br/><b>S</b>egurança, <br/><b>C</b>onfiabilidade, <br/><b>Performance</b> ou Eficiência de desempenho, <br/><b>O</b>timização de custos, <br/><b>S</b>ustentabilidade.', 'AWS Well-Architected Framework --> Pillars (tip, decorate initials: OSR+POS or OSR Key+ POS-Graduate=P=Performance): <br/><b>O</b>perational excellence, <br/><b>S</b>afety, <br/><b>R</b>eliability, <br/><b>Performance</b> or Performance Efficiency, <br/><b>O</b>ptimization of costs, <br/><b>S</b>ustainability.', '');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, 'Well-Architected Framework', 'EC2', 'S3', 'Excelência Operacional', save, 'Cargas de trabalho (Workload)', 'https://docs.aws.amazon.com/pt_br/wellarchitected/latest/userguide/workloads.html', '', 'Carga de trabalho (Workload) --> É um conjunto de códigos e recursos que fornece valor empresarial, como um aplicativo voltado ao cliente ou um processo de back-end. Pode consistir em um subconjunto de recursos em uma Conta da AWS ou ser uma coleção de vários recursos abrangendo várias Contas da AWS.', 'Workload --> A set of code and resources that provide business value, such as a customer-facing application or back-end process. It may consist of a subset of resources within an AWS Account, or it may be a collection of multiple resources spanning multiple AWS Accounts.', '');
	contadorMycode = String(parseInt(contadorMycode) + 1);



	//Treino AZ-900
	mytema = '2';
	mycategory = '2';
	students = await jsstoreCon.select({
		from: 'Student'
		  , where: { mytema: '' + mytema + ''
				   , mycategory: '' + mycategory + ''
		  }
	});
	if (students == '') {
		save = true;
	} else {
		save = false;
	}
	contadorMygroup = 1; //10
	contadorMycode = 0;
	//título
	linkhelp = linkhelp + getLinkHelp(mytema+'', mycategory+'', contadorMygroup+'', contadorMycode+'', contadorMycode+'', '', '', '', '', save, '', '', '', 'Fase 1.0', 'Phase 1.0', '');
	//perguntas
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, 'Nuvem Privada --> AZ-900', 'Nuvem Híbrida --> AZ-900', 'Multinuvem --> AZ-900', 'AZ-900: --> Nenhuma das alternativas', save, 'Nuvem Pública --> AZ-900', 'https://azure.microsoft.com/pt-br/resources/cloud-computing-dictionary/what-is-a-public-cloud/', '', 'AZ-900: Nuvem Pública --> Definida como uma série de serviços de computação oferecidos por terceiros à Internet pública, os quais são disponibilizados a qualquer pessoa que queira utilizá-los ou comprá-los. Eles podem ser gratuitos ou vendidos sob demanda, permitindo que os clientes paguem apenas pelo seu consumo de ciclos de CPU, armazenamento ou largura de banda.', 'AZ-900: Public Cloud --> Defined as a series of computing services offered by third parties to the public Internet, which are made available to anyone who wants to use or purchase them. They can be free or sold on demand, allowing customers to pay only for their consumption of CPU cycles, storage or bandwidth.', '');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, 'Nuvem Pública --> AZ-900', 'Nuvem Híbrida --> AZ-900', 'Multinuvem --> AZ-900', 'AZ-900: --> Nenhuma das alternativas', save, 'Nuvem Privada --> AZ-900', 'https://azure.microsoft.com/pt-br/resources/cloud-computing-dictionary/what-is-a-private-cloud/', '', 'AZ-900: Nuvem Privada --> Refere-se aos serviços de computação em nuvem oferecidos pela Internet ou por uma rede interna privada somente a usuários selecionados e não ao público geral. Também chamada de nuvem interna ou corporativa.', 'AZ-900: Private Cloud --> Refers to cloud computing services offered over the Internet or a private internal network to selected users only and not to the general public. Also called an internal or enterprise cloud.', '');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, 'Nuvem Privada --> AZ-900', 'Nuvem Pública --> AZ-900', 'Multinuvem --> AZ-900', 'AZ-900: --> Nenhuma das alternativas', save, 'Nuvem Híbrida --> AZ-900', 'https://azure.microsoft.com/pt-br/resources/cloud-computing-dictionary/what-is-hybrid-cloud-computing/', '', 'AZ-900: Nuvem Híbrida --> Ambiente de computação que combina um datacenter local (também chamado de nuvem privada) com uma nuvem pública, permitindo que dados e aplicativos sejam compartilhados entre eles. Algumas pessoas definem para incluir configurações de “multinuvem” em que uma organização usa mais de uma nuvem pública, além do datacenter local.', 'AZ-900: Hybrid Cloud --> Computing environment that combines an on-premises data center (also called a private cloud) with a public cloud, allowing data and applications to be shared between them. Some people define it to include “multi-cloud” setups where an organization uses more than one public cloud in addition to the on-premises datacenter.', '');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, 'Nuvem Privada --> AZ-900', 'Nuvem Híbrida --> AZ-900', 'Nuvem Pública --> AZ-900', 'AZ-900: --> Nenhuma das alternativas', save, 'Multinuvem --> AZ-900', 'https://azure.microsoft.com/pt-br/solutions/hybrid-cloud-app/#overview', '', 'AZ-900: Multinuvem --> Uma parte da sua empresa está no Microsoft Azure e outra parte está em outra nuvem, como: AWS, Google Cloud Platform, aplicativos SaaS baseados em nuvem e até ambientes de colocation.', 'AZ-900: Multicloud --> One part of your business is in Microsoft Azure and another part is in another cloud such as: AWS, Google Cloud Platform, cloud-based SaaS applications and even colocation environments.', '');
	contadorMycode = String(parseInt(contadorMycode) + 1);

	//Desafio AZ-900
	mytema = '2';
	mycategory = '4';
	students = await jsstoreCon.select({
		from: 'Student'
		  , where: { mytema: '' + mytema + ''
				   , mycategory: '' + mycategory + ''
		  }
	});
	if (students == '') {
		save = true;
	} else {
		save = false;
	}
	contadorMygroup = 1; //10
	contadorMycode = 0;
	//título
	linkhelp = linkhelp + getLinkHelp(mytema+'', mycategory+'', contadorMygroup+'', contadorMycode+'', contadorMycode+'', '', '', '', '', save, '', '', '', 'Fase 1.0', 'Phase 1.0', '');
	//perguntas
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, 'PAAS --> AZ-900', 'SAAS --> AZ-900', 'Computação Sem Servidor --> AZ-900', 'BAAS', save, 'IAAS --> AZ-900', 'https://azure.microsoft.com/pt-br/resources/cloud-computing-dictionary/what-is-iaas/', '', 'AZ-900 IAAS (Infraestrutura como Serviço) --> Um tipo de serviço de computação em nuvem que oferece recursos fundamentais de computação, armazenamento e rede sob demanda e pagos conforme o uso.', 'AZ-900 IAAS (Infrastructure as a Service) --> A type of cloud computing service that delivers core compute, storage, and network resources on demand and on a pay-as-you-go basis.', '');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, 'IAAS --> AZ-900', 'SAAS --> AZ-900', 'Computação Sem Servidor --> AZ-900', 'BAAS', save, 'PAAS --> AZ-900', 'https://azure.microsoft.com/pt-br/resources/cloud-computing-dictionary/what-is-paas/', '', 'AZ-900 PAAS (Plataforma como Serviço) --> Um ambiente de desenvolvimento e implantação completo na nuvem, com recursos que permitem a você fornecer tudo, desde aplicativos simples baseados em nuvem até sofisticados aplicativos empresariais habilitados para a nuvem. Você adquire os recursos necessários por meio de um provedor de serviços de nuvem com pagamento conforme o uso e os acessa por uma conexão com a Internet segura.', 'AZ-900 PAAS (Platform as a Service) --> A complete cloud development and deployment environment with features that allow you to deliver everything from simple cloud-based applications to sophisticated cloud-enabled enterprise applications. You purchase the required resources through a pay-as-you-go cloud service provider and access them over a secure Internet connection.', '');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, 'PAAS --> AZ-900', 'IAAS --> AZ-900', 'Computação Sem Servidor --> AZ-900', 'BAAS', save, 'SAAS --> AZ-900', 'https://azure.microsoft.com/pt-br/resources/cloud-computing-dictionary/what-is-saas/', '', 'AZ-900 SAAS (Software como Serviço) --> Permite aos usuários se conectar e usar aplicativos baseados em nuvem pela Internet. Exemplos comuns são email, calendário e ferramentas do Office (como Microsoft Office 365). Fornece uma solução de software completa que você pode comprar em uma base paga conforme o uso por um  provedor de serviço de nuvem.', 'AZ-900 SAAS (Software as a Service) --> Allows users to connect and use cloud-based applications over the Internet. Common examples are email, calendar, and Office tools (such as Microsoft Office 365). Provides a complete software solution that you can purchase on a pay-as-you-go basis from a cloud service provider.', '');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, 'PAAS --> AZ-900', 'SAAS --> AZ-900', 'IAAS --> AZ-900', 'BAAS', save, 'Computação Sem Servidor --> AZ-900', 'https://azure.microsoft.com/pt-br/resources/cloud-computing-dictionary/what-is-serverless-computing/', '', 'AZ-900 Computação Sem Servidor --> Elimina a necessidade de gerenciar a infraestrutura, permite que os desenvolvedores criem aplicativos de forma mais rápida. Com aplicativos nessa computação, o provedor de serviços de nuvem provisiona, dimensiona e gerencia automaticamente a infraestrutura necessária para executar o código.', 'AZ-900 Serverless Computing --> Eliminates the need to manage infrastructure, allows developers to build applications faster. With applications on that compute, the cloud service provider automatically provisions, scales, and manages the infrastructure needed to run the code.', '');
	contadorMycode = String(parseInt(contadorMycode) + 1);



	//Treino Oracle
	mytema = '3';
	mycategory = '2';
	students = await jsstoreCon.select({
		from: 'Student'
		  , where: { mytema: '' + mytema + ''
				   , mycategory: '' + mycategory + ''
		  }
	});
	if (students == '') {
		save = true;
	} else {
		save = false;
	}
	contadorMygroup = 1; //10
	contadorMycode = 0;
	//título
	linkhelp = linkhelp + getLinkHelp(mytema+'', mycategory+'', contadorMygroup+'', contadorMycode+'', contadorMycode+'', '', '', '', '', save, '', '', '', 'Fase 1.0', 'Phase 1.0', '');
	//perguntas
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, 'Nuvem Privada --> AZ-900', 'Nuvem Híbrida --> AZ-900', 'HCM (Oracle Fusion Cloud Human Capital Management) --> Oracle', '', save, 'OCI (Oracle Cloud Infrastructure) --> Oracle', 'https://docs.oracle.com/pt-br/iaas/Content/GSG/Concepts/baremetalintro.htm', '', 'Oracle: OCI (Oracle Cloud Infrastructure) --> Conjunto complementar de serviços de nuvem que permite criar e executar uma variedade de aplicativos e serviços em um ambiente hospedado altamente disponível.', 'Oracle: OCI (Oracle Cloud Infrastructure) --> Complementary set of cloud services that enable you to build and run a variety of applications and services in a highly available hosted environment.', '');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, 'OCI (Oracle Cloud Infrastructure) --> Oracle', 'Nuvem Híbrida --> AZ-900', 'Multinuvem --> AZ-900', '', save, 'HCM (Oracle Fusion Cloud Human Capital Management) --> Oracle', 'https://www.oracle.com/br/cloud/', '', 'Oracle: HCM (Oracle Fusion Cloud Human Capital Management)  --> Solução de RH nativa em nuvem completa que conecta todos os processos de recursos humanos, desde a contratação até a aposentadoria.', 'Oracle: HCM (Oracle Fusion Cloud Human Capital Management) --> Complete cloud-native HR solution that connects all human resource processes from hiring to retirement.', '');
	contadorMycode = String(parseInt(contadorMycode) + 1);

	//Desafio Oracle
	mytema = '3';
	mycategory = '4';
	students = await jsstoreCon.select({
		from: 'Student'
		  , where: { mytema: '' + mytema + ''
				   , mycategory: '' + mycategory + ''
		  }
	});
	if (students == '') {
		save = true;
	} else {
		save = false;
	}
	contadorMygroup = 1; //10
	contadorMycode = 0;
	//título
	linkhelp = linkhelp + getLinkHelp(mytema+'', mycategory+'', contadorMygroup+'', contadorMycode+'', contadorMycode+'', '', '', '', '', save, '', '', '', 'Fase 1.0', 'Phase 1.0', '');
	//perguntas
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, 'Vertical Scaling', 'Parallel Scaling', 'Manual Scaling', '', save, 'Autoscaling', 'https://docs.oracle.com/pt-br/iaas/Content/Compute/Tasks/autoscalinginstancepools.htm', '', 'Você tem um aplicativo da Web que recebe 5 vezes mais tráfego nos finais de semana do que nos dias de semana. Você precisa corresponder automaticamente a capacidade à demanda, manter o aplicativo sempre em funcionamento e economizar custos. <br/>Qual recurso de computação do Oracle Cloud Infrastructure (OCI) pode ser usado para atender a esses requisitos?', 'You have a web application that receives 5X more traffic on the weekends than weekdays. You need to automatically match capacity to demand, keep the application always up and running, and save cost. <br/>Which Oracle Cloud Infrastructure (OCI) compute feature can be used to meet these requirements?', '');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, 'Monitoring', 'Events', 'Cost Analysis', '', save, 'Budget', 'https://docs.oracle.com/pt-br/iaas/Content/Billing/Concepts/budgetsoverview.htm', '', 'Qual recurso do Oracle Cloud Infrastructure (OCI) permite que você configure alertas para notificá-lo se uma previsão de orçamento for excedida ou se o gasto ultrapassar um determinado valor?', 'Which Oracle Cloud Infrastructure (OCI) capability allows you to set up alerts to notify you if a budget forecast is to be exceeded or spending surpasses a certain amount?', '');
	contadorMycode = String(parseInt(contadorMycode) + 1);



	//Último registro para testar se o loading está completo e já pode liberar a página para uso. 
	//Esse registro é o último a ser inserido na tabela. Quando ele aparece indica que todos foram inseridos também.
	mytema = '0';
	mycategory = '0';
	contadorMygroup = 1; //10
	contadorMycode = String(parseInt('0') + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'FIM', 'https://', '', 'FIM', 'THE END', '');
	
	
	
	
	
	
	
	//não precisa gravar o restante na tabela porque já estão nos arquivos, exemplo: T3C4G16.html
	var save = false;







	//////////////////////////
	// AZURE AZ-900 - LINKHELP
	//////////////////////////
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Nenhuma das alternativas --> AZ-900', 'https://azure.microsoft.com/pt-br/resources/cloud-computing-dictionary/what-is-cloud-computing', '', 'AZ-900: --> Nenhuma das alternativas');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Sim --> AZ-900: Não Se Aplica', 'https://azure.microsoft.com/pt-br/resources/cloud-computing-dictionary/what-is-cloud-computing', '', 'AZ-900: --> Não Se Aplica');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Não --> AZ-900: Não Se Aplica', 'https://azure.microsoft.com/pt-br/resources/cloud-computing-dictionary/what-is-cloud-computing', '', 'AZ-900: --> Não Se Aplica');
	contadorMycode = String(parseInt(contadorMycode) + 1);







	/////////////////////////
	// AWS CFL-C01 - LINKHELP
	/////////////////////////
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Confiabilidade', 'https://aws.amazon.com/pt/architecture/well-architected/?achp_wa1&wa-lens-whitepapers.sort-by=item.additionalFields.sortDate&wa-lens-whitepapers.sort-order=desc', '', 'Confiabilidade (também conhecida como disponibilidade) --> Se concentra nos workloads que executam as funções pretendidas e na recuperação rápida de falhas em atender demandas ou desenho à prova de falhas. Os principais tópicos incluem projeto de sistemas distribuídos, planejamento de recuperação e requisitos adaptação a mudanças.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Segurança', 'https://aws.amazon.com/pt/architecture/well-architected/?achp_wa1&wa-lens-whitepapers.sort-by=item.additionalFields.sortDate&wa-lens-whitepapers.sort-order=desc', '', 'Segurança --> Se concentra na proteção de informações e sistemas. Os principais tópicos incluem confidencialidade e integridade de dados, gerenciamento de permissões de usuário e estabelecimento de controles para detectar eventos de segurança.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Excelência Operacional', 'https://aws.amazon.com/pt/architecture/well-architected/?achp_wa1&wa-lens-whitepapers.sort-by=item.additionalFields.sortDate&wa-lens-whitepapers.sort-order=desc', '', 'Excelência Operacional --> Se concentra na execução e monitoramento de sistemas e na melhoria contínua de processos e procedimentos. Os principais tópicos incluem automação de alterações, reação a eventos e definição de padrões para gerenciar as operações diárias. A automação pode melhorar a estabilidade, a eficiência durante as implementações e a resposta a eventos.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Performance Eficiente', 'https://aws.amazon.com/pt/architecture/well-architected/?achp_wa1&wa-lens-whitepapers.sort-by=item.additionalFields.sortDate&wa-lens-whitepapers.sort-order=desc', '', 'Performance Eficiente --> Se concentra na alocação estruturada e simplificada de recursos de TI e computação. Os principais tópicos incluem seleção dos tipos e tamanhos certos dos recursos otimizados para os requisitos de workload, monitoramento de performance e manutenção da eficiência à medida que as necessidades comerciais evoluem.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Resiliência', 'https://docs.aws.amazon.com/pt_br/wellarchitected/latest/reliability-pillar/resiliency-and-the-components-of-reliability.html', 'se recuperar de interrupções de infraestrutura ou serviço', 'Resiliência --> É a capacidade de uma carga de trabalho se recuperar de interrupções de infraestrutura ou serviço, adquirir dinamicamente recursos computacionais para atender à demanda e mitigar interrupções, como configurações incorretas ou problemas temporários de rede.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup+'', contadorMycode+'', contadorMycode+'', '', '', '', '', save, 'Perspectivas Well-Architected', 'https://docs.aws.amazon.com/pt_br/wellarchitected/latest/userguide/lenses.html', 'perspectivas oferecem uma maneira de você medir de forma consistente suas arquiteturas', 'As perspectivas --> Oferecem uma maneira de medir de forma consistente suas arquiteturas em relação às melhores práticas e identificar áreas para melhoria. O AWS Lente de estrutura Well-Architected é aplicado automaticamente quando uma carga de trabalho é definida.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup+'', contadorMycode+'', contadorMycode+'', '', '', '', '', save, 'Classes de armazenamento', 'https://aws.amazon.com/pt/s3/storage-classes/', 'armazenamento de objetos', 'Opção padrão (default) de armazenamento de objetos com altos níveis de resiliência, disponibilidade e performance para dados acessados com frequência. Tem baixa latência e alto throughput.<br/>1 Standard (padrão),<br/>2 Intelligent Tiering,<br/>3 Standard-IA,<br/>4 One Zone-IA,<br/>5 Glacier Instant Retrieval,<br/>6 Glacier Flexible,<br/>7 Glacier Deep Archive,<br/>8 Outposts.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup+'', contadorMycode+'', contadorMycode+'', '', '', '', '', save, 'Frequent Access', 'https://aws.amazon.com/pt/s3/storage-classes/', '', 'Frequent Access (Acesso Frequente) --> Está contida na S3 Intelligent-Tiering (camada inteligente) oferece latência de milissegundos e alta performance de taxa de transferência para dados acessados com muita frequência, com pouca frequência e raramente acessados nos níveis Frequent Access, Infrequent Access e o Archive Instant Access.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup+'', contadorMycode+'', contadorMycode+'', '', '', '', '', save, 'Intelligent Tiering', 'https://aws.amazon.com/pt/getting-started/hands-on/getting-started-using-amazon-s3-intelligent-tiering/#:~:text=O%20S3%20Intelligent%2DTiering%20armazena,otimizada%20para%20dados%20raramente%20acessados.', '', 'S3 Intelligent-Tiering --> É uma classe de armazenamento do Amazon S3 projetada para otimizar os custos de armazenamento ao mover automaticamente os dados para a camada de acesso mais econômica quando os padrões de acesso se alteram. Move objetos que não foram acessados por 30 dias consecutivos para a camada Infrequent Access para que você obtenha uma economia de 40% e, após 90 dias sem acesso, os objetos são movidos para a camada Archive Instant Access com uma economia de 68%. Se os objetos forem acessados posteriormente, o S3 Intelligent-Tiering automaticamente os moverá de volta para a camada Frequent Access.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup+'', contadorMycode+'', contadorMycode+'', '', '', '', '', save, 'Infrequent Access', 'https://aws.amazon.com/pt/s3/storage-classes/', 'dados acessados com menos frequência, mas que exigem acesso rápido', 'Infrequent Access (Acesso Infrequente) do S3 Standard-IA --> É indicado para dados acessados com menos frequência, mas que exigem acesso rápido quando necessários. Oferece os altos níveis de resiliência e throughput e a baixa latência. Combina baixo custo e alta performance.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup+'', contadorMycode+'', contadorMycode+'', '', '', '', '', save, 'Glacier', 'https://docs.aws.amazon.com/pt_br/amazonglacier/latest/dev/introduction.html', 'custo extremamente baixo', 'Armazenamento de objetos da classe S3, opção Glacier --> É uma classe de armazenamento do Amazon S3 segura, durável e de custo extremamente baixo para arquivamento de dados e backup de longo prazo. É para arquivamento e não para armazenamento.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup+'', contadorMycode+'', contadorMycode+'', '', '', '', '', save, 'Standard', 'https://aws.amazon.com/pt/s3/storage-classes/', 'é o mais caro', 'Armazenamento de objetos da classe S3, opção Standard (Padrão) --> É o mais caro e oferece um armazenamento de objetos com altos níveis de resiliência, disponibilidade e performance para dados acessados com frequência. Como fornece baixa latência e alto throughput.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Glacier Deep Arquive', 'https://aws.amazon.com/pt/s3/faqs/#Amazon_S3_Glacier_Deep_Archive', '', 'S3 Glacier Deep Arquive --> É uma classe de armazenamento do Amazon S3 que oferece armazenamento de objetos seguro e durável para retenção de longo prazo de dados acessados uma ou duas vezes por ano. oferece armazenamento de custo mais baixo na nuvem, a preços significativamente mais baixos do que armazenar e manter dados em bibliotecas de fitas magnéticas on-premises ou arquivar dados externamente.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'SNS', 'https://aws.amazon.com/pt/sns/?whats-new-cards.sort-by=item.additionalFields.postDateTime&whats-new-cards.sort-order=desc', 'baseados em push', 'Amazon SNS (Simple Notification Service) --> É um serviço de mensagens totalmente gerenciado para a comunicação de aplicação para aplicação (A2A) e de aplicação para pessoa (A2P). A funcionalidade pub/sub de A2A fornece tópicos para sistemas de mensagens de alta taxa de transferência baseados em push.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'SES', 'https://docs.aws.amazon.com/pt_br/ses/latest/dg/Welcome.html', 'plataforma de e-mail', 'Amazon SES (Simple Email Service) --> É uma plataforma de e-mail que oferece uma forma fácil e econômica para você enviar e receber e-mail usando seus próprios endereços de e-mail e domínios.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'SQS', 'https://aws.amazon.com/pt/sqs/', 'filas de mensagens', 'Amazon SQS (Simple Queue Service) --> Oferece uma fila hospedada segura, durável e disponível que permite integrar e desacoplar sistemas de software e componentes distribuídos. O Amazon SQS oferece construções comuns, como filas de mensagens mortas e tags de alocação de custos.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'MQ', 'https://aws.amazon.com/pt/amazon-mq/?amazon-mq.sort-by=item.additionalFields.postDateTime&amazon-mq.sort-order=desc', 'agente de mensagens na AWS', 'O Amazon MQ --> É um serviço gerenciado pela AWS. É um agente de mensagens para o Apache ActiveMQ e RabbitMQ que facilita a configuração e a operação de agentes de mensagens na AWS. O Amazon MQ reduz suas responsabilidades operacionais gerenciando o provisionamento, a configuração e a manutenção dos agentes de mensagem para você.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Open Source', 'https://www.redhat.com/pt-br/topics/open-source/what-is-open-source', '', 'Open Source é um termo que se refere ao software open source (OSS). Ele é um código projetado para ser acessado abertamente pelo público: todas as pessoas podem vê-lo, modificá-lo e distribuí-lo conforme suas necessidades.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'RDS', 'https://aws.amazon.com/pt/rds/', 'facilita a configuração, operação e escalabilidade de bancos de dados na nuvem', 'O Amazon Relational Database Service (Amazon RDS) --> É uma coleção de serviços gerenciados que facilita a configuração, operação e escalabilidade de bancos de dados na nuvem. Uma instância de banco de dados do RDS reside em uma única região. É compatível com replicação de dados para todas regiões AWS. Escolha entre sete opções de mecanismos bastante utilizados: Amazon Aurora compatível com MySQL, Amazon Aurora compatível com PostgreSQL, MySQL, MariaDB, PostgreSQL, Oracle e SQL Server.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'DMS', 'https://aws.amazon.com/pt/dms/', 'migrar bancos de dados', 'AWS DMS (Database Migration Service) --> Ajuda você a migrar bancos de dados para a AWS de modo rápido e seguro. O banco de dados de origem permanece totalmente operacional durante a migração, minimizando o tempo de inatividade de aplicações que dependem do banco de dados.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Aurora', 'https://docs.aws.amazon.com/pt_br/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html', 'banco de dados relacional', 'O Amazon Aurora --> É um mecanismo de banco de dados relacional gerenciado compatível com o MySQL e o PostgreSQL. O Aurora pode oferecer até cinco vezes a taxa de processamento do MySQL e até três vezes a taxa de processamento do PostgreSQL. Oferecer disponibilidade superior a 99,99% replicando seis cópias dos seus dados em três zonas diferentes.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'DynamoDB', 'https://aws.amazon.com/pt/dynamodb/', '', 'AWS DynamoDB --> É um <b>banco de dados de chave-valor NoSQL (não relacional)</b>, sem servidor e totalmente gerenciado, projetado para executar aplicações de alta performance em qualquer escala. Usa API do serviço e o Json.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'DynamoDB Accelerator DAX', 'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html', '', 'O DAX (DynamoDB Accelerator) --> É um serviço de armazenamento em cache compatível com o DynamoDB no qual você pode se beneficiar da rápida performance em memória para aplicações exigentes. Não foi concebido para hospedagem de sites estáticos.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'DynamoDB APIS e JSON', 'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Programming.LowLevelAPI.html', 'API do DynamoDB de baixo nível usa JSON', 'A API do DynamoDB de baixo nível usa JSON (JavaScript Object Notation) como um formato de protocolo de fio.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'MariaDB', 'https://aws.amazon.com/pt/rds/mariadb/', '', 'MariaDB --> É um banco de dados relacional de código aberto conhecido no mercado, que foi criado pelos desenvolvedores originais do MySQL. O Amazon RDS facilita a configuração, a operação e a escalabilidade de implantações do servidor desse banco de dados relacional na nuvem.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'MySql', 'https://aws.amazon.com/pt/rds/mysql/', '', 'MySql --> É um banco de dados relacional de código aberto NÃO gerenciados pela AWS e o Amazon RDS facilita a configuração, a operação e a escalabilidade de implantações de MySQL na nuvem. Com o Amazon RDS, você pode implantar em minutos servidores MySQL escaláveis com capacidade de hardware econômica e redimensionável.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'SQL Server', 'https://aws.amazon.com/pt/rds/sqlserver/', '', 'SQL Server --> É um sistema de gerenciamento de bancos de dados relacionais desenvolvido pela Microsoft. O Amazon RDS para esse banco de dados facilita a configuração, a operação e a escalabilidade de implantações do desse banco de dados na nuvem.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
		
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Storage Gateway', 'https://aws.amazon.com/pt/storagegateway/', 'acesso on-premises para armazenamento virtual na nuvem', 'AWS Storage Gateway --> É um conjunto de serviços de armazenamento na nuvem híbrida que oferece acesso on-premises para armazenamento virtual na nuvem praticamente ilimitado. Não é compatível diretamente com a replicação entre regiões.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'API Gateway', 'https://aws.amazon.com/pt/api-gateway/', '', 'AWS API Gateway --> É um serviço gerenciado que permite desenvolvedores criar, publicar, manter, monitorar e proteger APIs em qualquer escala com facilidade.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Direct Connect', 'https://docs.aws.amazon.com/pt_br/directconnect/latest/UserGuide/Welcome.html', '', 'AWS Direct Connect --> Vincula sua rede interna a um local do AWS Direct Connect usando um cabo de fibra óptica Ethernet padrão. Uma extremidade do cabo é conectada ao roteador, e a outra é conectada a um roteador do AWS Direct Connect. O Direct Connect é uma alternativa que fornece uma conexão privada dedicada entre suas instalações locais e a Nuvem AWS.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'DataSync', 'https://aws.amazon.com/pt/datasync/', '', 'DataSync --> É um serviço online seguro que automatiza e acelera a movimentação de dados entre serviços de armazenamento on-premises e da AWS.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'EventSync', 'https://docs.aws.amazon.com/pt_br/cognito/latest/developerguide/getting-started-with-cognito-sync.html', 'sincronização dos dados de usuários', 'O Amazon Cognito Sync --> É um serviço da AWS e uma biblioteca de clientes que permite a sincronização dos dados de usuários relacionados a aplicações entre dispositivos.');
	contadorMycode = String(parseInt(contadorMycode) + 1);

	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'SSH', 'https://docs.aws.amazon.com/pt_br/AWSEC2/latest/UserGuide/ec2-key-pairs.html', '', 'SSH (Secure Socket Shell) --> É um par de chaves, que consiste em uma chave pública e uma chave privada, trata-se de um conjunto de credenciais de segurança usadas para provar sua identidade ao se conectar a uma instância do Amazon EC2.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'KMS', 'https://docs.aws.amazon.com/pt_br/kms/latest/developerguide/overview.html', 'chaves criptográficas', 'AWS KMS (Key Management Service) --> É um serviço gerenciado que facilita a criação e o controle de chaves criptográficas usadas para proteger os dados. Para proteger e validar suas AWS KMS keys, o AWS KMS usa módulos de segurança de hardware (HSMs) de acordo com o Programa de validação de módulos criptográficos FIPS 140-2.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'STS', 'https://aws.amazon.com/pt/about-aws/whats-new/2019/04/aws-security-token-service-sts-now-supports-enabling-the-global-sts-endpoint-to-issue-session-tokens-compatible-with-all-aws-regions/', 'emissão de tokens de sessão', 'AWS STS (Security Token Service) --> Oferece suporte à habilitação do endpoint global dele para emissão de tokens de sessão compatíveis com todas as regiões da AWS.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Redis', 'https://aws.amazon.com/pt/redis/', 'datastore de chave-valor', 'O Redis (Remote Dictionary Server) --> É um datastore de chave-valor rápido e de código aberto na memória e é usado como banco de dados, cache, agente de mensagens e fila. A AWS oferece dois serviços totalmente gerenciados para executar o Redis: Amazon MemoryDB for Redis e o  O Amazon ElastiCache for Redis.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Elastic Cache', 'https://aws.amazon.com/pt/elasticache/', 'cache na memória', 'AWS Elastic Cache --> É um serviço de cache na memória totalmente gerenciado. Você pode usar para armazenamento em cache, o que acelera a performance de aplicações e bancos de dados, ou como um armazenamento de dados principal para casos de uso que não exigem durabilidade, como armazenamentos de sessões, placares de jogos, streaming e análises. Compatível com o Redis e o Memcached.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Cognito', 'https://docs.aws.amazon.com/pt_br/cognito/latest/developerguide/what-is-amazon-cognito.html', 'cadastramento, login e controle de acesso', 'AWS Cognito --> Permite adicionar autenticação de usuários (cadastramento, login e controle de acesso) a aplicações Web e móveis com rapidez e facilidade para vários dispositivos e mídias sociais como Apple, Facebook, Google e Amazon. Integra com SAML 2.0 e OpenID.');
	contadorMycode = String(parseInt(contadorMycode) + 1);

	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'EFS', 'https://aws.amazon.com/pt/efs/', 'sistema de arquivos simples, não objetos', 'AWS EFS (Elastic File System) --> É um sistema de arquivos escalável, compartilhados e simples(não objetos: html, js, css). <br/>Sem servidor para definição única que facilita a configuração, a escalabilidade e a otimização de custos do armazenamento de arquivos na AWS.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'EBS Snapshots', 'https://docs.aws.amazon.com/pt_br/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html#USER_WorkingWithAutomatedBackups.BackupWindow', '100 por região', 'EBS Snapshots do serviço RDS --> São backups incrementais, o que significa que somente os blocos no dispositivo que tiverem mudado depois do snapshot mais recente serão salvos. Isso minimiza o tempo necessário para criar o snapshot e economiza em custos de armazenamento ao não duplicar os dados.<br/>Os limites de snapshot manual (100 por região) não se aplicam a backups automáticos.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'EBS', 'https://aws.amazon.com/pt/ebs/', '', 'EBS (Amazon Elastic Block Store) --> É um serviço de armazenamento em blocos, escalável e de alta performance projetado para o Amazon Elastic Compute Cloud (Amazon EC2). Replica dados automaticamente em uma zona de disponibilidade. É necessário associar um EBS a uma instância EC2 para garantir a persistência dos dados quando a instância é desligada. Essa arquitetura de banco de dados pode ser gerenciada pelo time do Cliente. Não pode ser compartilhado por se comportarem como dispositivos de blocos brutos e não formatados.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'EBS Volumes', 'https://docs.aws.amazon.com/pt_br/AWSEC2/latest/UserGuide/ebs-volumes.html', 'dispositivo de armazenamento em blocos', 'EBS Volumes --> É um dispositivo de armazenamento em blocos durável que é possível anexar às suas instâncias. Depois de anexar um volume a uma instância, será possível usá-lo como você usaria um disco rígido físico.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'EC2 Armazenamento de instâncias', 'https://docs.aws.amazon.com/pt_br/AWSEC2/latest/UserGuide/InstanceStorage.html', '', 'Armazenamento de instâncias EC2 ---> Fornece armazenamento temporário em nível de bloco para a instância. Esse armazenamento está localizado em discos que estão anexados fisicamente ao computador host. O armazenamento de instâncias é ideal para o armazenamento temporário de informações que são alteradas frequentemente, como buffers, caches, dados de rascunho e outros conteúdos temporários ou para dados replicados em toda a frota de instâncias, como um grupo com balanceamento de carga de servidores Web.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Neptune', 'https://aws.amazon.com/pt/neptune/', 'serviço de banco de dados de grafos', 'Amazon Neptune --> É um serviço de banco de dados de grafos rápido, confiável e totalmente gerenciado que facilita a criação e a execução de aplicativos na AWS. O núcleo do Neptune é um mecanismo de banco de dados gráfico com projeto específico e alta performance.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Graph', 'https://www.padowan.dk/doc/portuguese/Introduction.html', '', 'Amazon Graph --> É apenas um conceito para traçar gráficos de funções matemáticas e outras curvas de natureza similar, em um sistema de coordenadas.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Neo4j', 'https://neo4j.com/partners/amazon/', '', 'Amazon Neo4j --> Trabalha com a AWS (partner). Capacita desenvolvedores e cientistas de dados a criar rapidamente aplicativos escaláveis ​​e orientados por IA ou analisar big data com algoritmos. Como um banco de dados gráfico nativo criado para armazenar dados e conectar os relacionamentos, o Neo4j permite insights rápidos e profundamente contextuais.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'JanusGraph', 'https://janusgraph.org/', '', 'Amazon JanusGraph --> Trabalha com a AWS (partner). É um banco de dados (open source) gráfico escalável otimizado para armazenar e consultar gráficos contendo centenas de bilhões de vértices e arestas distribuídos em um cluster de várias máquinas.');
	contadorMycode = String(parseInt(contadorMycode) + 1);

	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Athena', 'https://aws.amazon.com/pt/athena/?whats-new-cards.sort-by=item.additionalFields.postDateTime&whats-new-cards.sort-order=desc', 'consultas interativas usando SQL padrão', 'AWS Athena --> É um serviço de consultas interativas usando SQL padrão que facilita a análise de dados no Amazon S3. Não precisa de servidor. Portanto, não há infraestrutura para gerenciar e você paga apenas pelas consultas executadas.');
	contadorMycode = String(parseInt(contadorMycode) + 1);

	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'RedShift', 'https://docs.aws.amazon.com/pt_br/redshift/latest/mgmt/welcome.html', 'Data Warehouse', 'AWS RedShift --> É um serviço de Data Warehouse em escala de petabytes totalmente gerenciado na nuvem. Permite usar os dados para adquirir novos insights para seus negócios e clientes.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'EMR', 'https://aws.amazon.com/pt/emr/', 'Big Data', 'AWS EMR (Amazon Elastic MapReduce) --> É uma plataforma de Big Data em nuvem usada para executar trabalhos de processamento de dados distribuídos em grande escala, consultas SQL interativas e aplicações de machine learning (ML).');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'X-Ray', 'https://aws.amazon.com/pt/xray/', '', 'AWS X-Ray --> Ajuda desenvolvedores a analisar e depurar aplicações distribuídas de produção, como as criadas usando uma arquitetura de microsserviços. Com o X-Ray, é possível entender a performance de aplicativos e de seus serviços subjacentes para identificar e solucionar problemas e erros de performance.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Kinesis', 'https://aws.amazon.com/pt/kinesis/#:~:text=O%20Amazon%20Kinesis%20Data%20Streams,centenas%20de%20milhares%20de%20fontes', '', 'Amazon Kinesis Data Streams --> É um serviço escalável e durável de streaming de dados em tempo real capaz de capturar continuamente gigabytes de dados por segundo de centenas de milhares de fontes.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'QuickSight', 'https://aws.amazon.com/pt/quicksight/', '', 'O Amazon QuickSight --> Permite que todos em sua organização entendam seus dados por meio de perguntas em linguagem natural, do uso de painéis interativos ou procurando automaticamente padrões e discrepâncias com tecnologia de machine learning.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'SageMaker', 'https://aws.amazon.com/pt/pm/sagemaker/?trk=41368dcc-5040-4349-998b-a9c524544f65&sc_channel=ps&s_kwcid=AL!4422!3!532488969034!e!!g!!aws%20sagemaker&ef_id=EAIaIQobChMI-beq1r7E-gIViCZMCh2PqgFVEAAYASAAEgK2kfD_BwE:G:s&s_kwcid=AL!4422!3!532488969034!e!!g!!aws%20sagemaker', 'machine learning', 'SageMaker --> É para criar, treinar e implantar modelos de machine learning para qualquer caso de uso com infraestrutura, ferramentas e fluxos de trabalho totalmente gerenciados pela AWS oferecendo uma IDE para uso.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'AppFlow', 'https://aws.amazon.com/pt/appflow/', 'transferir dados com segurança entre aplicações de Software', 'O Amazon AppFlow --> É um serviço de integração totalmente gerenciado que permite transferir dados com segurança entre aplicações de Software como Serviço (SaaS), como Salesforce, SAP, Zendesk, Slack e ServiceNow, e produtos da AWS, como o Amazon S3 e Amazon Redshift.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'OpsWorks Stacks', 'https://aws.amazon.com/pt/opsworks/stacks/faqs/', 'gerenciar aplicações e servidores na AWS e localmente', 'O AWS OpsWorks Stacks --> Permite gerenciar aplicações e servidores na AWS e localmente.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'OpsWorks', 'https://aws.amazon.com/pt/opsworks/', 'gerenciamento de configurações de servidores via código', 'AWS OpsWorks --> É um serviço de gerenciamento de configurações de servidores via código que oferece instâncias gerenciadas do Chef e do Puppet. O Chef e o Puppet são plataformas de automação que permitem usar código para automatizar a configuração de servidores. Ele permite usar o Chef e o Puppet para automatizar a forma como os servidores são configurados, implantados e gerenciados em instâncias do Amazon EC2 ou ambientes de computação no local.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Refatoração', 'https://aws.amazon.com/pt/getting-started/hands-on/break-monolith-app-microservices-ecs-docker-ec2/module-one/', '', 'A refatoração --> É uma forma disciplinada de reestruturar o código quando pequenas mudanças são feitas nele para melhorar o design. Ao usar o Refactor Spaces, os clientes se concentram na refatoração das suas aplicações, e não na criação e no gerenciamento da infraestrutura subjacente que torna a refatoração possível.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Docker', 'https://aws.amazon.com/pt/docker/', '', 'Docker --> É uma plataforma de software que permite a criação, o Nível e a implantação de aplicações rapidamente. Permite executar o código de maneira padronizada. É um sistema operacional para contêineres. Da mesma maneira que uma máquina virtual virtualiza.');
	contadorMycode = String(parseInt(contadorMycode) + 1);

	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'CloudWatch', 'https://aws.amazon.com/pt/cloudwatch/faqs/', '', 'AWS CloudWatch --> É um serviço de monitoramento para recursos em nuvem AWS e os aplicativos que você executa na AWS. <br/>Você pode usar para coletar e rastrear métricas, coletar e monitorar arquivos de log, e <u>definir alarmes de faturamento</u> para monitorar as cobranças estimadas da AWS.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'CloudTrail', 'https://docs.aws.amazon.com/pt_br/awscloudtrail/latest/userguide/cloudtrail-user-guide.html', 'monitora e registra a atividade da conta por toda a infraestrutura', 'AWS CloudTrail --> Rastreia atividades dos usuários e uso de APIs. O AWS CloudTrail monitora e registra a atividade da conta por toda a infraestrutura da AWS, oferecendo controle sobre o armazenamento, análise e ações de remediação.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'CloudSearch', 'https://aws.amazon.com/pt/cloudsearch/', 'pesquisa para o site ou aplicativo', 'AWS CloudSearch --> É um serviço gerenciado na nuvem AWS com o qual é possível configurar, gerenciar e dimensionar uma solução de pesquisa para site ou aplicativo de forma simples e econômica.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'ElasticSearch', 'https://aws.amazon.com/pt/opensearch-service/the-elk-stack/what-is-elasticsearch/', 'análises de log', 'AWS ElasticSearch --> É um mecanismo distribuído de pesquisa e análise usado para casos de uso de análises de log.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'WAF', 'https://aws.amazon.com/pt/waf/', 'firewall de aplicações Web', 'AWS WAF --> É um firewall de aplicações Web que ajuda a proteger suas aplicações Web ou APIs contra bots e exploits comuns na Web que podem afetar a disponibilidade, comprometer a segurança ou consumir recursos em excesso. O AWS WAF oferece controle sobre como o tráfego atinge suas aplicações, permitindo que você crie regras de segurança que controlam o tráfego de bots e bloqueiam padrões de ataque comuns, como injeção de SQL ou cross-site scripting.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Shield', 'https://aws.amazon.com/pt/shield/?whats-new-cards.sort-by=item.additionalFields.postDateTime&whats-new-cards.sort-order=desc', 'proteção contra DDoS', 'AWS Shield --> É um serviço gerenciado de proteção contra DDoS (Negação de serviço distribuída) que protege os aplicativos executados na AWS. O AWS Shield oferece de detecção e mitigações em linha automáticas e sempre ativas que minimizam o tempo de inatividade e a latência dos aplicativos, fornecendo proteção contra DDoS sem necessidade de envolver o AWS Support. O AWS Shield tem dois níveis, Standard e Advanced.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Macie', 'https://aws.amazon.com/pt/macie/', '', 'AWS Macie --> É um serviço de segurança e privacidade de dados totalmente gerenciado que usa machine learning e correspondência de padrões para descobrir e proteger seus dados confidenciais na AWS.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'GuardDuty', 'https://aws.amazon.com/pt/guardduty/', 'detecção de ameaças que monitora continuamente', 'GuardDuty --> É um serviço de detecção de ameaças que monitora continuamente suas contas e workloads da AWS para detectar atividade maliciosa e entrega resultados de segurança detalhados para visibilidade e correção.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Inspector', 'https://aws.amazon.com/pt/inspector/', 'gerenciamento de vulnerabilidade que verifica continuamente', 'O Amazon Inspector --> É um serviço automatizado de gerenciamento de vulnerabilidade que verifica continuamente as workloads da AWS em busca de vulnerabilidades de software e exposição não intencional à rede.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Trusted Advisor', 'https://aws.amazon.com/pt/premiumsupport/technology/trusted-advisor/', 'avalia a sua conta por meio de verificações', 'AWS Trusted Advisor --> Avalia a sua conta por meio de verificações, avisa se a MFA não está habilitada, sem interromper serviços. Também verifica permissões de bucket do S3 no Amazon S3 com permissões de acesso aberto. Essas verificações identificam formas de otimizar sua infraestrutura da AWS, aumentar a segurança e o desempenho, reduzir os custos gerais e monitorar as cotas do serviço. Benefícios:<br/><b>O</b>timização de custos<br/><b>P</b>erformance<br/><b>S</b>egurança<br/><b>T</b>olerância a falhas<br/><b>C</b>otas de serviço.<br/>Clientes do <br/>AWS Basic Support e <br/>AWS Developer Support <br/>podem acessar as principais verificações de segurança. <br/>Clientes do <br/>AWS Business Support e do <br/>AWS Enterprise Support <br/>podem acessar todas as verificações.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'IAAS', 'https://aws.amazon.com/pt/what-is-cloud-computing/?nc2=h_ql_le_int_cc', 'recursos de rede, computadores', 'IaaS (Infraestrutura como Serviço) --> Contém os componentes básicos da IT na nuvem. Normalmente, o IaaS oferece acesso a recursos de rede, computadores (virtuais ou em hardware dedicado) e espaço de armazenamento de dados. O IaaS oferece o mais alto nível de flexibilidade e controle de gerenciamento sobre os recursos de infraestrutura de tecnologia.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'SAAS', 'https://aws.amazon.com/pt/what-is-cloud-computing/?nc2=h_ql_le_int_cc', 'aplicativos de usuários finais', 'SaaS (Software como Serviço) O SaaS --> Oferece um produto completo, executado e gerenciado pelo provedor de serviços. Na maioria dos casos, refere-se a aplicativos de usuários finais (como e-mail baseado na web). Com uma oferta de SaaS, você não precisa pensar sobre a manutenção do serviço ou o gerenciamento da infraestrutura subjacente. Você só precisa se preocupar sobre como utilizará esse software específico.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'PAAS', 'https://aws.amazon.com/pt/what-is-cloud-computing/?nc2=h_ql_le_int_cc', 'hardware e sistemas operacionais', 'PaaS (Plataforma como Serviço) --> Você não precisa mais gerenciar a infraestrutura subjacente (geralmente, hardware e sistemas operacionais) e pode manter o foco na implantação e no gerenciamento de aplicativos.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'BAAS', 'https://aws.amazon.com/pt/what-is-cloud-computing/?nc2=h_ql_le_int_cc', 'automatiza o desenvolvimento do backend', 'BAAS (Backend As A Service) --> É um serviço que automatiza o desenvolvimento do backend, por meio da terceirização dessas funções. Pode ser classificado como um middleware, ou seja, um software que fornece serviços para outros aplicativos ou o próprio sistema. O backend é a estrutura que possibilita a operação do sistema.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'MFA', 'https://docs.aws.amazon.com/pt_br/IAM/latest/UserGuide/id_credentials_mfa.html#id_credentials_mfa-what-is-mfa', 'agrega mais segurança', 'AWS MFA (Autenticação Multi Fator) --> Agrega mais segurança porque requer dos usuários fornecer autenticação exclusiva de um mecanismo de MFA com suporte da AWS, além das suas credenciais de login regular ao acessarem sites ou serviços da AWS.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'IAM', 'https://aws.amazon.com/pt/iam/', 'controle de acesso a serviços e recursos', 'AWS IAM (Identity and Access Management) --> Fornece controle de acesso a serviços e recursos em determinada condição em toda a AWS. Com as políticas dele, você gerencia permissões para seu quadro de funcionários e sistemas para garantir permissões com privilégios mínimos no princípio do menor privilégio. Não alerta sobre eventos de login do console por usuário raiz.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'IAM Policies', 'https://docs.aws.amazon.com/pt_br/IAM/latest/UserGuide/access_policies_examples.html', 'associado a uma identidade ou um recurso, define suas permissões e fornece uma declaração formal', 'IAM Policies (Política) --> É um objeto na AWS que, quando associado a uma identidade ou um recurso, define suas permissões e fornece uma declaração formal de uma ou mais permissões no IAM. A AWS avalia essas políticas quando uma entidade de segurança do IAM (usuário ou função) faz uma solicitação. As permissões nas políticas determinam se a solicitação será permitida ou negada. Fornece uma declaração formal de uma ou mais permissões no IAM.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'IAM Groups', 'https://docs.aws.amazon.com/pt_br/IAM/latest/UserGuide/id_groups.html', '', 'IAM Groups (Grupo de Usuários do IAM) --> É um conjunto de usuários do IAM. Os grupos de usuários permitem especificar permissões para vários usuários, o que pode facilitar o gerenciamento das permissões para esses usuários. Por exemplo, você pode ter um grupo de usuários chamado Admins e oferecer a esse grupo de usuários os tipos de permissões de que os administradores normalmente precisam.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'IAM Users', 'https://docs.aws.amazon.com/pt_br/IAM/latest/UserGuide/id_users.html', '', 'IAM Users (Usuário do AWS) --> É uma entidade que você cria na AWS para representar a pessoa ou a aplicação que o utilizará para interagir com a AWS. Um usuário na AWS consiste em um nome e credenciais.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'IAM Roles', 'https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html', '', 'IAM Roles (Função do IAM) --> É uma identidade do IAM que você pode criar em sua conta que tem permissões específicas. São credenciais temporárias que expiram. Você pode usar funções para delegar acesso a usuários, aplicativos ou serviços que normalmente não têm acesso aos seus recursos da AWS. Por exemplo, você pode permitir que um aplicativo móvel use recursos da AWS.');
	contadorMycode = String(parseInt(contadorMycode) + 1);

	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Region', 'https://aws.amazon.com/pt/about-aws/global-infrastructure/regions_az/', '', 'A AWS tem o conceito de uma região, que --> É um local físico em todo o mundo onde agrupamos datacenters. Chamamos cada grupo de datacenters lógicos de zona de disponibilidade. Cada região da AWS consiste em várias AZs isoladas e separadas fisicamente em uma área geográfica.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Multi Regions', 'https://aws.amazon.com/pt/solutions/implementations/multi-region-application-architecture/', 'estratégia de DR', 'Multi Regions (Distribuir em regiões diferentes) --> É para estratégia de DR (Recuperação de Desastre). Os recursos de computação em nuvem da Amazon são hospedados em vários locais no mundo todo fornecendo implementação global de computação e armazenamento. Esses locais são compostos por regiões da AWS, zonas de disponibilidade e zonas locais. Cada região da AWS é uma área geográfica separada.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Multi-AZ', 'https://docs.aws.amazon.com/pt_br/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html', 'aumentar a disponibilidade', 'Multi-AZ --> É para aumentar a disponibilidade. Fornece implementações em uma região, ou seja, não é global. Em uma implantação Multi-AZ, o Amazon RDS cria automaticamente uma instância de banco de dados (BD) primária e replica de forma síncrona os dados para uma instância em uma AZ diferente. Quando detecta uma falha, o Amazon RDS executa automaticamente o failover para uma instância secundária sem nenhuma intervenção manual.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Read Replicas', 'https://aws.amazon.com/pt/rds/features/read-replicas/', 'escalabilidade', 'Read Replicas (Cópias de Leitura do Amazon RDS) --> Facilitam a escalabilidade de maneira elástica além dos limites de capacidade de uma única instância de DB para cargas de trabalho de banco de dados com uso intenso de leitura. Complementam as implantações Multi-AZ. Embora ambos os recursos mantenham uma segunda cópia dos dados, há diferenças entre os dois.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Fargate', 'https://docs.aws.amazon.com/pt_br/AmazonECS/latest/developerguide/AWS_Fargate.html', 'executar contêineres sem a necessidade de gerenciar servidores', 'Fargate --> É uma tecnologia que pode ser usada com o Amazon ECS para executar contêineres sem a necessidade de gerenciar servidores ou clusters de instâncias do Amazon EC2. <br/>Com o AWS Fargate, não é mais necessário provisionar, configurar nem dimensionar os clusters de máquinas virtuais para executar contêineres. <br/>Fargate elimina a necessidade de escolher tipos de servidor, decidir quando dimensionar clusters ou otimizar o agrupamento de clusters.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'EKS', 'https://aws.amazon.com/pt/eks/', 'executar e escalar aplicações do Kubernetes', 'Amazon EKS (Elastic Kubernetes Service) --> É um serviço de contêiner gerenciado para executar e escalar aplicações do Kubernetes na nuvem ou on-premises. Adiciona orquestração ao Amazon ECS.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'ECS', 'https://docs.aws.amazon.com/pt_br/AmazonECS/latest/developerguide/Welcome.html', 'serviço de gerenciamento de contêineres', 'Amazon ECS (Elastic Container Service) --> É um serviço de gerenciamento de contêineres altamente rápido e escalável. Você pode usá-lo para executar, interromper e gerenciar contêineres em um cluster.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'ECR', 'https://aws.amazon.com/pt/ecr/', 'registro de contêiner', 'Amazon ECR (Elastic Container Registry) --> É um registro de contêiner totalmente gerenciado que oferece hospedagem de alta performance para que você possa implantar imagens e artefatos de aplicações de forma confiável em qualquer lugar.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'IAC', 'https://aws.amazon.com/marketplace/solutions/devops/infrastructure-as-code?aws-marketplace-cards.sort-by=item.additionalFields.headline&aws-marketplace-cards.sort-order=desc&awsf.aws-marketplace-devops-store-use-cases=*all', '', 'AWS IAC (Infraestrutura como Código) --> Não se aplica na AWS. Ajuda as organizações a atingir suas metas de automação e autoatendimento de DevOps, mantendo arquivos de declaração no controle de versão que definem seus ambientes de aplicativos.');
	contadorMycode = String(parseInt(contadorMycode) + 1);

	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'ELB', 'https://aws.amazon.com/pt/elasticloadbalancing/', 'distribui ou redireciona automaticamente o tráfego de aplicações ou requisições de entrada entre servidores', 'AWS ELB (Elastic Load Balancer) --> Distribui ou redireciona automaticamente o tráfego de aplicações ou requisições de entrada entre servidores, vários destinos e dispositivos virtuais em uma ou mais Zonas de disponibilidade (AZs).');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Batch', 'https://aws.amazon.com/pt/batch/?nc2=h_ql_prod_cp_ba', '', 'AWS Batch --> Planeja, programa e executa suas cargas de trabalho de computação em lote em toda a linha de recursos e produtos de computação da AWS, como AWS Fargate, Amazon EC2 e instâncias spot.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Step Functions', 'https://aws.amazon.com/step-functions/?c=ser&sec=srv&step-functions.sort-by=item.additionalFields.postDateTime&step-functions.sort-order=desc', '', 'Step Functions --> É um serviço de fluxo de trabalho visual com pouco código utilizado por desenvolvedores para criar aplicações distribuídas, automatizar processos de TI e negócios e criar pipelines de dados e machine learning usando produtos da AWS. Baseado em computação sem servidor e orquestra parte de: S3, API Gateway, Lambda, SQS e SNS.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Security Group', 'https://docs.aws.amazon.com/pt_br/AWSEC2/latest/UserGuide/ec2-security-groups.html', 'controlar o tráfego de entrada e de saída', 'Security Group --> É um grupo de segurança que atua como firewall virtual para as instâncias do EC2 visando controlar o tráfego de entrada e de saída.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'AWS Audit Manager', 'https://aws.amazon.com/pt/audit-manager/', '', 'O AWS Audit Manager --> Ajuda a auditar continuamente seu uso da AWS para simplificar sua forma de avaliar os riscos e a compatibilidade com os regulamentos e padrões do setor. O Audit Manager automatiza a coleta de evidências para reduzir o esforço manual coletivo que costuma acontecer durante as auditorias e permite escalar sua capacidade de auditoria na nuvem à medida que sua empresa cresce.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Auto Scaling', 'https://aws.amazon.com/pt/ec2/autoscaling/', 'adicionar ou remover instâncias do EC2 automaticamente', 'O Amazon EC2 Auto Scaling --> Ajuda a manter a disponibilidade das aplicações e permite adicionar ou remover instâncias do EC2 automaticamente de acordo com as condições que você definir (escalar baseado em demanda). A escalabilidade não reduz as interdependências entre os componentes.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Personal Health Dashboard', 'https://aws.amazon.com/pt/premiumsupport/technology/personal-health-dashboard/', '', 'O AWS Personal Health Dashboard --> Fornece alertas e orientação para eventos da AWS que podem afetar seu ambiente. Mostra o status geral dos produtos da AWS e fornece notificações proativas e transparentes sobre seu ambiente específico na AWS.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Config', 'https://aws.amazon.com/pt/config/', 'acessar, auditar e avaliar as configurações', 'AWS Config --> É um serviço que permite acessar, auditar e avaliar as configurações dos recursos da AWS. Você pode analisar alterações feitas nas configurações e relacionamentos entre os recursos da AWS, aprofundar-se de forma detalhada no histórico de configuração de recursos e determinar a conformidade geral em relação às configurações especificadas em suas diretrizes internas.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'AMS', 'https://aws.amazon.com/managed-services/', 'Fornece recursos proativos, preventivos e de detecção', 'AMS (AWS Managed Services) --> Ajuda você a adotar a AWS em escala e a operar com mais eficiência e segurança. Fornece recursos proativos, preventivos e de detecção que elevam o nível operacional e ajudam a reduzir riscos sem restringir a agilidade, permitindo que você se concentre na inovação.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Criptografia dos dados', 'https://docs.aws.amazon.com/pt_br/AmazonS3/latest/userguide/UsingEncryption.html', '', 'Proteção de dados protege os dados em trânsito à medida que são transferidos para e do Amazon S3. É possível proteger dados em trânsito usando SSL/TLS (Secure Socket Layer/Transport Layer Security) com criptografia no lado do cliente ou no lado do servidor.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'LightSail', 'https://aws.amazon.com/pt/lightsail/?nc2=h_ql_prod_fs_ls', '', 'O Amazon Lightsail --> Oferece instâncias de servidor privado virtual (VPS), contêineres, armazenamento, bancos de dados e muito mais a um preço mensal econômico. Cria sites personalizados, como: WordPress, Magento, Prestashop e Joomla.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Lambda', 'https://docs.aws.amazon.com/pt_br/lambda/latest/dg/welcome.html', '', 'AWS Lambda --> É um serviço de computação que permite executar código sem provisionar ou gerenciar servidores, ou seja, processa dados sem servidor e pode ser acionado pelo S3 e SNS.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Clusters', 'https://docs.aws.amazon.com/pt_br/AmazonECS/latest/userguide/clusters.html', '', 'Um cluster do Amazon ECS --> É um agrupamento lógico de tarefas ou serviços no Amazon ECS.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Suporte', 'https://docs.aws.amazon.com/pt_br/awssupport/latest/user/getting-started.html', 'cinco planos de suporte', 'O AWS Suporte --> Oferece cinco planos de suporte: <br/>1. Basic (menor custo), <br/>2. Developer, <br/>3. Business, <br/>4. Enterprise On-Ramp, <br/>5. Enterprise  (maior custo).<br/><b>Tempo de resposta</b>: <br/>Basic (menor que 1 hora), <br/>Developer (menor que 1 hora), <br/>Business (menor que 1 hora). <br/>Enterprise On-Ramp (menor que 30 minutos). <br/>Enterprise (menor que 15 minutos). <br/>Todos os planos de suporte oferecem acesso <b>24 horas por dia, 7 dias por semana ao atendimento ao cliente, à documentação da AWS, aos whitepapers e aos fóruns de suporte</b>. <br/><b>Basic, Developer, Business</b> (com acesso aos <b>engenheiros do Cloud Support por telefone</b>) <br/><b>Developer</b> (com acesso somente por <b>e-mail</b> em horário comercial). <br/><b>Enterprise e Business</b> (com acesso ininterrupto por <b>telefone, e-mail e chat</b>).');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'AMI', 'https://docs.aws.amazon.com/pt_br/AWSEC2/latest/UserGuide/ec2-instances-and-amis.html', 'imagem de uma máquina virtual', 'AWS AMI (Imagem de Máquina da Amazon) --> É uma imagem de uma máquina virtual suportada e mantida pela AWS que fornece as informações necessárias para iniciar uma instância.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Marketplace', 'https://aws.amazon.com/pt/mp/marketplace-service/overview/', 'catálogo digital de software pronto de terceiros', 'AWS Marketplace --> É um catálogo digital de software pronto de terceiros que facilita encontrar, testar, comprar e implantar e podem ser executados no AWS.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Service Catalog', 'https://aws.amazon.com/pt/servicecatalog/?aws-service-catalog.sort-by=item.additionalFields.createdDate&aws-service-catalog.sort-order=desc', '', 'O AWS Service Catalog --> Permite que empresas criem e gerenciem catálogos de serviços de TI que estejam aprovados para uso na AWS. Esses serviços de TI podem incluir tudo, de imagens de máquinas virtuais, servidores, software e bancos de dados a arquiteturas completas de aplicações multicamadas.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Route53', 'https://docs.aws.amazon.com/pt_br/Route53/latest/DeveloperGuide/Welcome.html', 'registro de domínios', 'O Amazon Route 53 --> É um web service de Domain Name System (DNS) altamente disponível e dimensionável. Você pode usá-lo para executar três funções principais em qualquer combinação: registro de domínios, roteamento de DNS e verificação de integridade.');
	contadorMycode = String(parseInt(contadorMycode) + 1);

	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'CodeBuild', 'https://aws.amazon.com/pt/codebuild/', '', 'AWS CodeBuild --> É um serviço de integração contínua totalmente gerenciado que compila o código-fonte, executa testes e produz pacotes de software que estão prontos para implantação.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'CodeCommit', 'https://aws.amazon.com/pt/codecommit/', '', 'O AWS CodeCommit --> É um serviço de controle de origem gerenciado seguro e altamente dimensionável que hospeda repositórios privados do Git. Ele torna mais fácil para as equipes colaborarem com segurança no código com contribuições criptografadas em trânsito e em repouso.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'CodeDeploy', 'https://aws.amazon.com/pt/codedeploy/', '', 'AWS CodeDeploy --> É um serviço totalmente gerenciado de implantação que automatiza implantações de software em diversos serviços de computação como Amazon EC2, AWS Fargate, AWS Lambda e servidores locais.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'CodePipeline', 'https://aws.amazon.com/pt/codepipeline/#:~:text=O%20AWS%20CodePipeline%20permite%20modelar,um%20aplicativo%20e%20suas%20depend%C3%AAncias', '', 'AWS CodePipeline --> É um serviço gerenciado de entrega contínua que permite criar uma esteira de CI/CD e ajuda a automatizar pipelines de liberação para oferecer atualizações rápidas e confiáveis de aplicativos e infraestruturas. O CodePipeline automatiza as fases de compilação, nível e implantação do processo de liberação sempre que ocorre uma mudança no código, de acordo com o modelo de liberação que você definiu.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'CodeCommit, CodeBuild, CodeDeploy', 'https://aws.amazon.com/pt/blogs/aws-brasil/construindo-um-pipeline-de-ci-cd-aws-devsecops-de-ponta-a-ponta-com-ferramentas-de-codigo-aberto-sca-sast-e-dast/#:~:text=Servi%C3%A7os%20de%20CI%2FCD&text=AWS%20CodeDeploy%20%E2%80%93%20%C3%A9%20um%20servi%C3%A7o,AWS%20Lambda%20e%20servidores%20locais', '', 'Ordem dos serviços AWS em um pipeline de CI/CD é 1, 2, 3. <br/>1 - AWS CodeCommit – Um serviço totalmente gerenciado de controle de código-fonte que hospeda repositórios seguros baseados em Git.<br/>2 - AWS CodeBuild – Um serviço de integração contínua totalmente gerenciado que compila o código-fonte, executa testes e produz pacotes de software que estão prontos para implantação.<br/>3 - AWS CodeDeploy – é um serviço totalmente gerenciado de implantação que automatiza implantações de software em diversos serviços de computação como Amazon EC2, AWS Fargate, AWS Lambda e servidores locais.');
	contadorMycode = String(parseInt(contadorMycode) + 1);

	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Tolerância a Falha', 'https://inf.unioeste.br/gia/index.php/2020/10/22/tolerancia-a-falhas-em-sistemas-distribuidos-e-suas-aplicacoes/', '', 'A tolerância a falhas --> É a propriedade que garante a correta e eficiente operação de um sistema apesar da ocorrência de falhas em qualquer um dos seus componentes ou unidades.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Acoplamento fraco', 'https://wa.aws.amazon.com/wat.question.REL_4.pt_BR.html', 'uma das melhores práticas é o baixo acoplamento', 'Aclopamento fraco --> É o baixo acoplamento que ajuda a isolar o comportamento de um componente dos outros componentes que dependem dele, o que aumenta a resiliência e a agilidade no pilar de Confiabilidade do AWS Well-Architected Framework. Uma falha em um dos componentes não deve afetar os outros componentes.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Elasticidade', 'https://aws.amazon.com/pt/what-is-cloud-computing/?nc2=h_ql_le_int_cc', 'provisiona a quantidade de recursos realmente necessária', 'Elasticidade --> É a capacidade de adquirir recursos quando você precisa deles e liberá-los quando você não precisar mais. Com a computação em nuvem, você não precisa provisionar recursos em excesso para absorver picos de atividades empresariais no futuro. Em vez disso, você provisiona a quantidade de recursos realmente necessária.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'IP Elástico', 'https://docs.aws.amazon.com/pt_br/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html', 'alocado para a conta da AWS e será seu até que você o libere', 'IP Elástico --> É um Endereço IP elástico --> É um endereço IPv4 estático projetado para computação em nuvem dinâmica. Um endereço IP elástico é alocado para a conta da AWS e será seu até que você o libere.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Elastic Beanstalk', 'https://aws.amazon.com/pt/elasticbeanstalk/', '', 'AWS Elastic Beanstalk --> É um serviço de fácil utilização para implantação e escalabilidade de aplicações e serviços da web desenvolvidos com Java, .NET, PHP, Node.js, Python, Ruby, Go e Docker em servidores familiares como Apache, Nginx, Passenger e IIS. Não reduz a latência do site.');
	contadorMycode = String(parseInt(contadorMycode) + 1);

	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'CloudFormation', 'https://aws.amazon.com/pt/cloudformation/', '', 'AWS CloudFormation --> Permite modelar, provisionar e gerenciar recursos da AWS e de terceiros ao tratar a infraestrutura como código. Permite padronizar e versionar as configurações de banco de dados de forma automatizada usando pipelines de CI/CD.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'CloudFront', 'https://docs.aws.amazon.com/pt_br/AmazonCloudFront/latest/DeveloperGuide/Introduction.html', '', 'O Amazon CloudFront --> É um serviço da web que acelera a distribuição do conteúdo estático e dinâmico da web para os usuários, diminuindo a latência (tempo de resposta) entre a requisição e a entrega. Exemplo de arquivos estáticos: .html, .css, .js e arquivos de imagem. Distribui o conteúdo por meio de uma rede global de datacenters denominados pontos de presença.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'VPC', 'https://aws.amazon.com/pt/vpc/', 'lança recursos da AWS em uma rede virtual isolada logicamente', 'O AWS VPC (Virtual Private Cloud) --> Define e lança recursos da AWS em uma rede virtual isolada logicamente. Oferece controle total sobre seu ambiente de redes virtual, incluindo posicionamento de recursos, conectividade e segurança.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'VPC endpoint', 'https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints.html', '', 'VPC endpoint --> Você pode criar seu próprio aplicativo em seu VPC e configurá-lo como um serviço habilitado pela AWS PrivateLink (conhecido como serviço de endpoint). Ele não se conecta a operações locais.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'VPN', 'https://aws.amazon.com/pt/vpn/', 'estabelecem conexões seguras entre redes locais', 'As soluções do AWS Virtual Private Network (VPN) --> Estabelecem conexões seguras entre redes locais, escritórios remotos, dispositivos de clientes e a rede global da AWS. O AWS VPN é composto por dois serviços: AWS Site-to-Site VPN e AWS Client VPN.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'PrivateLink', 'https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/aws-privatelink.html', '', 'O AWS PrivateLink --> Permite que você se conecte a alguns serviços AWS, serviços hospedados por outras contas AWS (chamadosde serviços de ponto final) e suportados serviços parceiros do AWS Marketplace, através de endereços IP privados em seu VPC. Os pontos finais da interface são criados diretamente dentro do seu VPC, usando interfaces de rede elásticas e endereços IP em seu Sub-redes do VPC.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Certificate Manager', 'https://aws.amazon.com/pt/certificate-manager/#:~:text=O%20AWS%20Certificate%20Manager%20%C3%A9,e%20os%20recursos%20internos%20conectados', '', 'Certificate Manager --> É um serviço que permite provisionar, gerenciar e implantar facilmente certificados Secure Sockets Layer (SSL)/Transport Layer Security (TLS) para uso com os serviços da AWS e os recursos internos conectados.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'License Manager', 'https://aws.amazon.com/pt/license-manager/', 'gerenciamento de suas licenças de software de fornecedores', 'O AWS License Manager --> Facilita o gerenciamento de suas licenças de software de fornecedores como Microsoft, SAP, Oracle e IBM em ambientes AWS e on-premises.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Console Manager', 'https://docs.aws.amazon.com/awsconsolehelpdocs/latest/gsg/learn-whats-new.html', '', 'AWS Management Console (Console de Gerenciamento da AWS) --> É um aplicativo da web que compreende e se refere a uma ampla coleção de consoles de serviço para gerenciar recursos da AWS.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'SDK', 'https://aws.amazon.com/pt/developer/tools/', 'C++, Go, Java, JavaScript, Kotlin, .NET, Node.js, PHP, Python, Ruby, Rust, Swift', 'SDK é para --> Desenvolver aplicativos na AWS na linguagem de programação de sua escolha, como: C++, Go, Java, JavaScript, Kotlin, .NET, Node.js, PHP, Python, Ruby, Rust, Swift.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'CLI', 'https://aws.amazon.com/pt/cli/', '', 'CLI (AWS Command Line Interface) --> É uma ferramenta de código aberto que permite interagir com os serviços da AWS usando comandos no shell da linha de comando. Permite criar scripts e fazer automação.');
	contadorMycode = String(parseInt(contadorMycode) + 1);

	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'EventBridge', 'https://aws.amazon.com/pt/eventbridge/?nc2=h_ql_prod_ap_eb', 'barramento de eventos', 'O Amazon EventBridge --> É um barramento de eventos sem servidor que torna mais fácil a criação de aplicações orientadas por eventos em escala usando eventos gerados com base em suas aplicações, aplicações integradas de software como serviço (SaaS) e serviços da AWS.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Resource Groups', 'https://docs.aws.amazon.com/ARG/latest/userguide/welcome.html', '', 'AWS Resource Groups --> É o serviço que permite gerenciar e automatizar tarefas em um grande número de recursos de uma vez. Um recurso é uma entidade com a qual você pode trabalhar. Os recursos na AWS são entidades como instâncias Amazon EC2 e buckets do Amazon S3.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Glue', 'https://docs.aws.amazon.com/pt_br/glue/latest/dg/what-is-glue.html', '', 'O AWS Glue --> É um serviço de ETL (extração, transformação e carregamento) totalmente gerenciado pela AWS.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'WorkSpaces', 'https://aws.amazon.com/pt/workspaces/#:~:text=O%20Amazon%20Workspaces%20%C3%A9%20um,partir%20de%20qualquer%20dispositivo%20compat%C3%ADvel', '', 'O Amazon Workspaces --> É um serviço de virtualização de desktop totalmente gerenciado para Windows e Linux que habilita o acesso a recursos a partir de qualquer dispositivo compatível.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Lifecycle', 'https://docs.aws.amazon.com/pt_br/AmazonS3/latest/userguide/object-lifecycle-mgmt.html', '', 'Lifecycle --> É uma configuração do S3, um arquivo XML que consiste em um conjunto de regras com ações predefinidas que você deseja que o Amazon S3 execute em objetos durante sua vida útil.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Responsabilidade Compartilhada', 'https://aws.amazon.com/pt/compliance/shared-responsibility-model/#:~:text=Responsabilidade%20da%20AWS%3A%20%E2%80%9Cseguran%C3%A7a%20da,os%20Servi%C3%A7os%20de%20nuvem%20AWS', '', 'Responsabilidade Compartilhada: --> A AWS é responsável por proteger a infraestrutura que executa todos os serviços oferecidos na Nuvem AWS. Essa infraestrutura é composta por hardware, software, redes e instalações que executam os Serviços de nuvem AWS. AWS e Cliente gerenciam configuração, patches e treinamentos, cada uma para seus próprios funcionários. O cliente é responsável pela segurança "NA" Nuvem AWS e gerencia o desenvolvimento de aplicações. A AWS responsável pela segurança "DA" Nuvem. A AWS compra servidores adicionais conforme necessidade do cliente e mantém totalmente os controles físicos.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'CodeStar', 'https://aws.amazon.com/pt/codestar/', 'desenvolva, compile e implante rapidamente aplicativos', 'O AWS CodeStar --> Permite que você desenvolva, compile e implante rapidamente aplicativos na AWS. Com o AWS CodeStar, é possível configurar toda a sua cadeia de ferramentas de entrega contínua em questão de minutos.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Amplify', 'https://aws.amazon.com/pt/amplify/', 'permite que desenvolvedores frontend para plataformas móveis e Web', 'O AWS Amplify --> É uma solução completa que permite que desenvolvedores frontend para plataformas móveis e Web criem, enviem e hospedem aplicações full-stack na AWS.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Global Accelerator', 'https://aws.amazon.com/pt/global-accelerator/?blogs-global-accelerator.sort-by=item.additionalFields.createdDate&blogs-global-accelerator.sort-order=desc&aws-global-accelerator-wn.sort-by=item.additionalFields.postDateTime&aws-global-accelerator-wn.sort-order=desc', 'otimiza o caminho quando a Internet está congestionada', 'O AWS Global Accelerator --> É um serviço de redes que melhora a performance do tráfego de seus usuários em até 60% usando a infraestrutura de rede global da Amazon Web Services. O AWS Global Accelerator otimiza o caminho quando a Internet está congestionada para sua aplicação para manter a perda de pacotes, o jitter e a latência consistentemente baixos.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'CodeArtifact', 'https://aws.amazon.com/pt/codeartifact/', 'serviço de repositório de artefatos', 'O AWS CodeArtifact --> É um serviço de repositório de artefatos totalmente gerenciado que facilita o armazenamento, a publicação, o gerenciamento e o compartilhamento com segurança, de pacotes de software usados em seu processo de desenvolvimento para Organizações de qualquer tamanho.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Edge Location', 'https://aws.amazon.com/pt/cloudfront/features/?whats-new-cloudfront.sort-by=item.additionalFields.postDateTime&whats-new-cloudfront.sort-order=desc', 'Atendem à solicitações do CloudFront e do Route 53', 'Edge Location --> É basicamente um pequeno servidor de cache. <br/>Atendem à solicitações do CloudFront e do Route 53. <br/>O usuário pode estar longe de uma Região (Region) mas próximo de um Rede de Borda (Edge Location).');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Backup', 'https://docs.aws.amazon.com/pt_br/aws-backup/latest/devguide/whatisbackup.html', 'proteção de dados', 'AWS Backup --> É um serviço totalmente gerenciado que facilita a centralização e a automação da proteção de dados em serviços AWS, na nuvem e no local. Você pode configurar políticas de backup e monitorar a atividade para seus recursos de AWS em um só lugar.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Detective', 'https://aws.amazon.com/pt/detective/faqs/', 'facilita a análise, a investigação e a identificação rápidas da causa raiz de potenciais problemas de segurança ou atividades suspeitas', 'O Amazon Detective --> Facilita a análise, a investigação e a identificação rápidas da causa raiz de potenciais problemas de segurança ou atividades suspeitas. Coleta automaticamente dados de log de seus recursos da AWS e usa aprendizado de máquina, análise estatística e teoria dos gráficos para criar um conjunto de dados vinculados que permite realizar facilmente investigações de segurança mais rápidas e eficientes.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Tags', 'https://docs.aws.amazon.com/pt_br/general/latest/gr/aws_tagging.html', '', 'Tags --> São metadados que você pode associar aos recursos da AWS. Você pode atribuir metadados aos seus recursos da AWS na forma de tags. Cada tag é um rótulo que consiste em um valor e uma chave definida pelo usuário. As tags podem ajudar você a gerenciar, identificar, organizar, pesquisar e filtrar recursos. Você pode criar tags para categorizar recursos por finalidade, proprietário, ambiente ou outros critérios. Exemplo: faturamento consolidado por categorias de negócios.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Snow', 'https://aws.amazon.com/pt/snow/', 'Migrar petabytes de dados', 'Snow --> São dispositivos desenvolvidos especificamente para migrar petabytes de dados de forma econômica, offline para a AWS ou processar dados na borda. Dispositivos da família: AWS Snowcone ou AWS Snowball.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Snowball', 'https://aws.amazon.com/pt/getting-started/hands-on/migrate-petabyte-scale-data/faq/', 'dispositivo para transporte de dados que acelera a transferência de terabytes a petabytes de dados', 'O AWS Snowball é uma solução de dispositivo para transporte de dados que acelera a transferência de terabytes a petabytes de dados para dentro e para fora da AWS usando dispositivos de armazenamento criados para oferecer transporte físico seguro.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Federation', 'https://aws.amazon.com/pt/identity/federation/', 'autenticar usuários', 'A AWS Federation (federação de identidade) é um sistema de confiança entre duas partes com o objetivo de autenticar usuários e transmitir informações necessárias para autorizar seu acesso aos recursos.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Transfer Acceleration', 'https://docs.aws.amazon.com/pt_br/AmazonS3/latest/userguide/transfer-acceleration.html', 'transferências de arquivos rápidas em nível de bucket', 'O Amazon S3 Transfer Acceleration --> É um recurso que possibilita transferências de arquivos rápidas em nível de bucket, fáceis e seguras em longas distâncias entre o seu cliente e um bucket do S3. Ele tira proveito dos pontos de presença distribuídos globalmente no Amazon CloudFront.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Connect', 'https://docs.aws.amazon.com/pt_br/connect/latest/adminguide/what-is-amazon-connect.html', 'integrar com outros aplicativos corporativos', 'O Amazon Connect --> É uma plataforma aberta que você pode integrar com outros aplicativos corporativos. Você pode configurar um centro de contatos em algumas etapas, adicionar agentes de qualquer lugar e começar a interagir com seus clientes.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Kafka', 'https://aws.amazon.com/pt/msk/', 'processamento de dados de streaming em tempo real', 'MSK (Amazon Managed Streaming for Apache Kafka) --> Facilita a ingestão e o processamento de dados de streaming em tempo real com o Apache Kafka totalmente gerenciado.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Conformidade da AWS', 'https://aws.amazon.com/pt/compliance/', 'PCI-DSS, HIPAA/HITECH, FedRAMP, GDPR, FIPS 140-2 e NIST 800-171', 'Conformidade da AWS --> Oferece suporte a padrões de segurança e certificações de conformidade como PCI-DSS, HIPAA/HITECH, FedRAMP, GDPR, FIPS 140-2 e NIST 800-171, ajudando os clientes a cumprir os requisitos de conformidade de praticamente todos os órgãos normativos do mundo. O cliente é responsável pela certificação de compliance.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'DocumentDB', 'https://aws.amazon.com/pt/documentdb/', '', 'O Amazon DocumentDB --> É um serviço de banco de dados escalável, altamente durável e totalmente gerenciado pela AWS para operar workloads do MongoDB de missão crítica. Dimensiona workloads JSON.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Melhores Práticas Chaves De Acesso', 'https://docs.aws.amazon.com/pt_br/accounts/latest/reference/credentials-access-keys-best-practices.html', '', 'Melhores Práticas Chaves De Acesso --> Use credenciais de segurança temporárias (funções do IAM) em vez de chaves de acesso de longo prazo. Em muitos casos, você não precisa de chaves de acesso de longo prazo que nunca expiram (como você tem com um usuário do IAM). Em vez disso, você pode criar funções do IAM e gerar credenciais de segurança temporárias.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Infraestrutura Global', 'https://aws.amazon.com/pt/about-aws/global-infrastructure/', '', 'A AWS atende a mais de 1 milhão de clientes ativos em 245 países e territórios. A Nuvem AWS opera 87 zonas de disponibilidade em 27 regiões geográficas, mais de 410 pontos de presença, 115 locais Direct Connect e há planos para adicionar mais zonas de disponibilidade e regiões.');
	contadorMycode = String(parseInt(contadorMycode) + 1);

	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'NACL', 'https://docs.aws.amazon.com/pt_br/vpc/latest/userguide/vpc-network-acls.html', 'tráfego de entrada ou de saída no nível da sub-rede', 'Uma lista de controle de acesso (ACL) de rede permite ou não determinado tráfego de entrada ou de saída no nível da sub-rede (subnet).');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'ACL', 'https://docs.aws.amazon.com/pt_br/AmazonS3/latest/userguide/acl-overview.html', 'gerenciamento do acesso aos buckets e objetos', 'As listas de controle de acesso (ACLs) do Amazon S3 permitem o gerenciamento do acesso aos buckets e objetos. Cada bucket e objeto tem uma ACL anexada como um sub-recurso. Ela define a quais grupos ou Contas da AWS o acesso é concedido, bem como o tipo de acesso. Quando um recurso é solicitado, o Amazon S3 consulta a ACL correspondente para verificar se o solicitante tem as permissões de acesso necessárias.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'IPV4', 'https://docs.aws.amazon.com/pt_br/AWSEC2/latest/UserGuide/using-instance-addressing.html', 'São limitados a 5 por região', 'Um endereço IPv4 privado é um endereço IP que não é acessível pela Internet. É possível usar endereços IPv4 privados para comunicação entre instâncias na mesma VPC. São limitados a 5 por região.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'IPV6', 'https://docs.aws.amazon.com/pt_br/vpc/latest/userguide/vpc-migrate-ipv6.html', 'suporte ao IPv6', 'Se você possuir uma VPC existente que ofereça suporte somente para IPv4 e recursos na sub-rede que sejam configurados para usar somente o IPv4, você pode habilitar o suporte ao IPv6 para a VPC e recursos.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'On Premises', 'https://docs.aws.amazon.com/codedeploy/latest/userguide/instances-on-premises.html', '', 'On premises é a infraestrutura ou Data Center particular, privado, local de uma empresa.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Keyspaces', 'https://aws.amazon.com/pt/keyspaces/', 'compatível com o Apache Cassandra', 'O Amazon Keyspaces (for Apache Cassandra) é um serviço de banco de dados compatível com o Apache Cassandra, escalável, altamente disponível e gerenciado.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Bucket', 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html', '', 'Regras de nomenclatura de bucket do serviço S3.<br/>Devem ter entre 3 (min) e 63 (max) caracteres.<br/>Podem consistir apenas em letras minúsculas, números, pontos (.) e hífens (-).<br/>Devem começar e terminar com uma letra ou número.<br/>Não devem conter dois pontos adjacentes.<br/>Não devem ser formatados como um endereço IP (por exemplo, 192.168.5.4).<br/>Não devem começar com o prefixo xn--.<br/>Não devem terminar com o sufixo -s3alias.<br/>devem ser exclusivos em todas as contas em todas as regiões em uma partição, da AWS. Use IAM role para dar permissões a um bucket privado.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'JSON', 'https://docs.aws.amazon.com/pt_br/athena/latest/ug/parsing-JSON.html', 'Muitos aplicativos e ferramentas produzem dados codificados em JSON', 'JavaScript Object Notation (JSON) é um método comum para codificar estruturas de dados como texto. Muitos aplicativos e ferramentas produzem dados codificados em JSON.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Apache Handoop', 'https://aws.amazon.com/pt/emr/features/hadoop/', 'Apache Hadoop dentro do serviço Amazon EMR (Big Data)', 'O Apache Hadoop --> No serviço Amazon EMR (Big Data) é um projeto de software de código aberto que pode ser usado para processar de modo eficiente grandes conjuntos de dados.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'GraphQl', 'https://aws.amazon.com/pt/appsync/', 'consultar vários bancos de dados', 'O AWS AppSync é um serviço sem servidor das APIs GraphQL e Pub/Sub que simplifica a criação de aplicações Web e de plataformas móveis modernas. As APIs GraphQL criadas com o AWS AppSync fornecem aos desenvolvedores de front-end a capacidade de consultar vários bancos de dados, microsserviços e APIs a partir de um único endpoint do GraphQL.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Security Hub', 'https://aws.amazon.com/pt/security-hub/', 'verificações de práticas recomendadas de segurança', 'O AWS Security Hub é um serviço de gerenciamento de procedimentos de segurança na nuvem que realiza verificações de práticas recomendadas de segurança, agrega alertas e permite a correção automatizada.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Advantages Cloud Computing', 'https://docs.aws.amazon.com/pt_br/whitepapers/latest/aws-overview/six-advantages-of-cloud-computing.html', '', '1 Troca as despesas de capital por despesas variáveis.<br/> 2 Grandes economias de escala alcançando um custo variável mais baixo do que normalmente seria possível.<br/> 3 Fazer suposições sobre capacidade.<br/> 4 Aumentar a velocidade e a agilidade.<br/> 5 Não investir dinheiro em administração e manutenção de datacenters.<br/> 6 Tornar-se global em minutos.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Teste de penetração', 'https://aws.amazon.com/pt/security/penetration-testing/', '', 'Os clientes da AWS podem realizar avaliações de segurança ou testes de penetração em sua infraestrutura da AWS sem aprovação prévia em oito serviços, listados na próxima seção como “Serviços permitidos”.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Data Privacy', 'https://aws.amazon.com/pt/compliance/data-privacy-faq/', '', 'A confiança do cliente é a principal prioridade da AWS. A AWS monitora continuamente o regulamento de privacidade em desenvolvimento e o cenário legislativo para identificar mudanças e determinar de quais ferramentas nossos clientes podem precisar para estar em conformidade com as suas necessidades.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Pricing on-demand', 'https://aws.amazon.com/pt/ec2/pricing/on-demand/', 'Dados transferidos diretamente na mesma região da AWS não são cobrados', 'Dados transferidos diretamente na mesma região da AWS não são cobrados entre os serviços Amazon e das instâncias do Amazon EC2. Os dados transferidos entre instâncias na mesma zona de disponibilidade não são cobrados.');
	contadorMycode = String(parseInt(contadorMycode) + 1);
	linkhelp = linkhelp + getLinkHelp(mytema, mycategory, contadorMygroup, contadorMycode, contadorMycode, '', '', '', '', save, 'Tipos de instância EC2', 'https://aws.amazon.com/pt/ec2/instance-types/', '', 'Tipos de instância do Amazon EC2 --> Otimizadas para computação <br/>Computação acelerada <br/>Otimizadas para armazenamento <br/>Recursos das instâncias <br/>Medição da performance das instâncias');
	contadorMycode = String(parseInt(contadorMycode) + 1);

	document.getElementById('divlinkhelp').innerHTML = linkhelp;
}

async function showCorrect(index, myid, mygroup, mycode) {
	if (document.getElementById('chkMycorrect' + index + 'answer').value < 5) { //1 a 4 = corretas. 5 a 8 = incorretas
		document.getElementById('chkMycorrect'+index+'answer').style.backgroundColor=CONST_MEDIUM_SEA_GREEN;
	} else {
		document.getElementById('chkMycorrect'+index+'answer').style.backgroundColor='#FF5555';
	}
	
	if (document.getElementById('chkMycorrect'+index+'answer').checked == true) {
		document.getElementById('chkMycorrect'+index+'answer').disabled = true;
	}

	var answer1 = ''; var answer2 = ''; var answer3 = ''; var answer4 = ''; var answer5 = ''; var answer6 = ''; var answer7 = ''; var answer8 = ''; var array = [];
	for (var index=1; index<9; index++) {
		if (document.getElementById('chkMycorrect' + index + 'answer').checked == true) {
			if (document.getElementById('chkMycorrect' + index + 'answer').value == '1') {
				answer1 = 'checked';
			} else if (document.getElementById('chkMycorrect' + index + 'answer').value == '2') {
				answer2 = 'checked';
			} else if (document.getElementById('chkMycorrect' + index + 'answer').value == '3') {
				answer3 = 'checked';
			} else if (document.getElementById('chkMycorrect' + index + 'answer').value == '4') {
				answer4 = 'checked';
			} else if (document.getElementById('chkMycorrect' + index + 'answer').value == '5') {
				answer5 = 'checked';
			} else if (document.getElementById('chkMycorrect' + index + 'answer').value == '6') {
				answer6 = 'checked';
			} else if (document.getElementById('chkMycorrect' + index + 'answer').value == '7') {
				answer7 = 'checked';
			} else if (document.getElementById('chkMycorrect' + index + 'answer').value == '8') {
				answer8 = 'checked';
			}
		}
	}
	var params = new URLSearchParams(window.location.search);
	var mytema = params.get('tem');
	var mycategory = params.get('cat');
	var myid = $('form').attr('data-student-id');
	var mygroup = document.getElementById('mygroupSim').value;
	var mycode = parseInt(document.getElementById('mycodeSim').value);
	updateAnswers(mytema, mycategory, myid, mygroup, mycode, answer1, answer2, answer3, answer4, answer5, answer6, answer7, answer8);
}

async function updateAnswers(mytema, mycategory, myid, mygroup, mycode, answer1, answer2, answer3, answer4, answer5, answer6, answer7, answer8) {
//alert('mytema='+mytema + ' mycategory='+mycategory + ' mygroup='+mygroup + ' mycode='+mycode + ' answer1='+answer1 + ' answer2='+answer2 + ' answer3='+answer3 + ' answer4='+answer4 + ' answer5='+answer5 + ' answer6='+answer6 + ' answer7='+answer7 + ' answer8='+answer8);
//	try {
		var noOfDataUpdated = await jsstoreCon.update({
			in: 'Student',
			set: {
				mycorrect1answer: answer1,
				mycorrect2answer: answer2,
				mycorrect3answer: answer3,
				mycorrect4answer: answer4,
				mycorrect5answer: answer5,
				mycorrect6answer: answer6,
				mycorrect7answer: answer7,
				mycorrect8answer: answer8
			}
			  , where: {
//				 id: myid + ''
				  mytema: mytema + ''
				, mycategory: mycategory + ''
				, mygroup: mygroup + ''
				, mycode: mycode + ''
			}
		});
//    } catch (ex) {
//        console.log(ex.message);
//    }
}

function showTip(valorindice) {
	if (document.getElementById('mytip' + valorindice).style.display == 'none') {
		document.getElementById('mytip' + valorindice).style.display='';
	} else {
		document.getElementById('mytip' + valorindice).style.display='none';
	}
}

function showFormUser() {
    $('#tblEstatisticas').hide();
    $('#divbotoes').hide();
    $('#divFormAddUpdate').hide();
	$('#divGear').hide();
	$('#divcontent').hide();
	$('#formBible').hide();
	$('#divconfig').hide();
	$('#divGearAddNewLiryc').hide();
	$('#divFormSim').hide();
	$('#divbuttons').hide();
	$('#tblCategory').hide();
	$('#divNivel').hide();
    $('#divFormUser').show();
	document.getElementById('txtPass').focus;
}

function showFormApresentacao() {
    $('#tblEstatisticas').hide();
    $('#divbotoes').hide();
    $('#divFormAddUpdate').hide();
	$('#divGear').hide();
	$('#divcontent').hide();
	$('#formBible').hide();
	$('#divconfig').hide();
	$('#divGearAddNewLiryc').hide();
	$('#divFormSim').hide();
	$('#divbuttons').hide();
	$('#tblCategory').hide();
	$('#divNivel').show();
    $('#divFormUser').hide();
}

function showFormCategory() {
    $('#tblEstatisticas').show();
    $('#divbotoes').hide();
    $('#divFormAddUpdate').hide();
	$('#divGear').hide();
	$('#divcontent').hide();
	$('#formBible').hide();
	$('#divconfig').hide();
	$('#divGearAddNewLiryc').hide();
	$('#divFormSim').hide();
	$('#divbuttons').hide();
	$('#tblCategory').show();
	$('#divNivel').hide();
    $('#divFormUser').hide();
}

function showFormSim() {
    $('#tblEstatisticas').hide();
    $('#divbotoes').show();
    $('#divFormAddUpdate').hide();
	$('#divGear').hide();
	$('#divcontent').hide();
	$('#formBible').hide();
	$('#divconfig').hide();
	$('#divGearAddNewLiryc').hide();
	$('#divFormSim').show();
//	$('#myCarousel').show();	
	$('#divbuttons').hide();
	$('#tblCategory').hide();
	$('#divNivel').hide();
    $('#divFormUser').hide();
//	document.getElementById('navBottom').style.display='';
	if (document.getElementById('btnPrevious') != null) {document.getElementById('btnPrevious').disabled = false; }
	if (document.getElementById('btnNext') != null) {document.getElementById('btnNext').disabled = false; }
//	if (document.getElementById('btnPause') != null) {document.getElementById('btnPause').style.display = ''; }
	if (document.getElementById('btnFormCategory') != null) {document.getElementById('btnFormCategory').style.display = 'none'; }
}

function showFormAddUpdate() {
    $('#tblEstatisticas').hide();
    $('#divbotoes').show();
    $('#divFormAddUpdate').show();
	$('#divGear').hide();
	$('#divcontent').hide();
	$('#formBible').hide();
	$('#divconfig').hide();
	$('#divGearAddNewLiryc').hide();
	$('#divFormSim').hide();
	$('#tblCategory').hide();
	$('#divNivel').hide();
    $('#divFormUser').hide();
}

function showGridAndHideForms() {
    $('#tblEstatisticas').show();
    $('#divbotoes').show();
    $('#divFormAddUpdate').hide();
	$('#divGear').hide();
	$('#divcontent').hide();
	$('#formBible').hide();
	$('#divGearAddNewLiryc').hide();
	$('#divFormSim').hide();
	$('#tblCategory').hide();
	$('#divNivel').hide();
    $('#divFormUser').hide();
	if (document.getElementById('btnTerminar') != null) {
		document.getElementById('btnTerminar').style.display='none';	
	}
}

function showAddNewManual() {
	$('#divGearAddNewLiryc').show();
    $('#divbotoes').show();
    $('#tblEstatisticas').hide();
    $('#divFormAddUpdate').hide();
	$('#divGear').hide();
	$('#divcontent').hide();
	$('#formBible').hide();
	$('#divconfig').hide();
	$('#divFormSim').hide();
	$('#tblCategory').hide();
	$('#divNivel').hide();
    $('#divFormUser').hide();
}

function showFormGear() {
    $('#tblEstatisticas').hide();
    $('#divbotoes').show();
    $('#divFormAddUpdate').hide();
	$('#divGear').show();
	$('#divcontent').hide();
	$('#formBible').hide();
	$('#divGearAddNewLiryc').hide();
	$('#divFormSim').hide();
	$('#tblCategory').hide();
	$('#divNivel').hide();
    $('#divFormUser').hide();
}

function showFormImport() {
    $('#tblEstatisticas').hide();
    $('#divbotoes').show();
    $('#divFormAddUpdate').hide();
	$('#divGear').hide();
	$('#divcontent').show();
	$('#formBible').hide();
	$('#divconfig').hide();
	$('#divGearAddNewLiryc').hide();
	$('#divFormSim').hide();
	$('#tblCategory').hide();
	$('#divNivel').hide();
    $('#divFormUser').hide();
}

function showBible() {
    $('#tblEstatisticas').hide();
    $('#divbotoes').show();
    $('#divFormAddUpdate').hide();
	$('#divGear').hide();
	$('#divcontent').hide();
	$('#formBible').show();
	$('#divconfig').hide();
	$('#divGearAddNewLiryc').hide();
	$('#divFormSim').hide();
	$('#tblCategory').hide();
	$('#divNivel').hide();
    $('#divFormUser').hide();
}

function showIniciarConfiguracao() {
    $('#tblEstatisticas').hide();
    $('#divbotoes').show();
    $('#divFormAddUpdate').hide();
	$('#divGear').hide();
	$('#divcontent').hide();
	$('#formBible').hide();
	$('#divconfig').show();
	$('#divGearAddNewLiryc').hide();
	$('#divFormSim').hide();
	$('#tblCategory').hide();
	$('#divNivel').hide();
    $('#divFormUser').hide();
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
    $('#mytext2').val(student.mytext2);
    $('#mytext3').val(student.mytext3);
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
			var params = new URLSearchParams(window.location.search);
			var mytema = params.get('tem');
			var mycategory = params.get('cat');
			var mycode = document.getElementById('mycode').value;
			var myorder = document.getElementById('myorder').value;
			var mygroup = document.getElementById('mygroup').value;
			var mytext = document.getElementById('mytext').value.trim();
			var mytext2 = document.getElementById('mytext2').value.trim();
			var mytext3 = document.getElementById('mytext3').value.trim();
			refreshTableData(mytema, mycategory, mycode, myorder, mygroup, mytext, mytext2, mytext3);
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
			var params = new URLSearchParams(window.location.search);
			var mytema = params.get('tem');
			var mycategory = params.get('cat');
			var mycode = document.getElementById('mycode').value;
			var myorder = document.getElementById('myorder').value;
			var mygroup = document.getElementById('mygroup').value;
			var mytext = document.getElementById('mytext').value.trim();
			var mytext2 = document.getElementById('mytext2').value.trim();
			var mytext3 = document.getElementById('mytext3').value.trim();
			refreshTableData(mytema, mycategory, mycode, myorder, mygroup, mytext, mytext2, mytext3);
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
		var params = new URLSearchParams(window.location.search);
		var mytema = params.get('tem');
		var mycategory = params.get('cat');
		var mycode = document.getElementById('mycode').value;
		var myorder = document.getElementById('myorder').value;
		var mygroup = document.getElementById('mygroup').value;
		var mytext = document.getElementById('mytext').value.trim();
		var mytext2 = document.getElementById('mytext2').value.trim();
		var mytext3 = document.getElementById('mytext3').value.trim();
		refreshTableData(mytema, mycategory, mycode, myorder, mygroup, mytext, mytext2, mytext3);
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
	var DataShow_Link = window.open(endereco, "_self");
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
//https://jsstore.net/tutorial/get-started/
//https://velhobit.com.br/design/fab-botao-flutuante-com-css3-e-html-sem-javascript.html
