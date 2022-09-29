

var jsstoreCon = new JsStore.Connection();

var CONST_NIVEL_MAX = 6;
var GLOBAL_textcolor = 'black';
var GLOBAL_background = 'white';
var GLOBAL_buttoncolor = 'btn-colors';
var COL_LOGOTIPO = 5;

window.onload = function () {
	refreshTableData('0', '', '', '');
    registerEvents();
    initDb();
	getConfigGeneral();	
	initLinkHelp();
	document.getElementById('myBody').style.background = GLOBAL_background;
	loadCombobox('mygroup', '0', '100', 'Teste');
	loadCombobox('mycode', '0', '100', 'Número');
	loadCombobox('myorder', '0', '100', 'Ordem');
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
//			mycategory: { notNull: true, dataType: 'string' }, //nível de agrupamento, exemplo: Tecnologia, Igreja, Conhecimentos Gerais...
//			mysubcategory: { notNull: true, dataType: 'string' }, //sub nível de agrupamento, exemplo: domínio 1, domínio 2, domínio 3...
//			myfase: { notNull: true, dataType: 'string' }, //fase, exemplo: fase 1, fase 2, fase 3 e fase 4
			mygroup: { notNull: true, dataType: 'string' }, //qual grupo a pergunta pertence, exemplo: domínio 1, domínio 2, domínio 3...
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
			mypoints: { Null: false, dataType: 'string' }, //índice de acerto na tentativa 4, 5, 6, 7... exemplo: 85,50,10,100 (todas separadas por vírgula)
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
			mypoints: { Null: false, dataType: 'string' }, //índice de acerto na tentativa 4, 5, 6, 7... exemplo: 85,50,10,100 (todas separadas por vírgula)
			mytry: { notNull: true, dataType: 'string' }, //quantidade de tentativas, exemplo: 1, 2, 3...; tentativa 1, tentativa 2, tentativa 3...
			mypercent: { notNull: true, dataType: 'string' }, //porcentagem que conseguiu
			mycorrects: { notNull: true, dataType: 'string' }, //quantidade de perguntas com respostas corretas
			myincorrects: { notNull: true, dataType: 'string' }, //quantidade de perguntas com respostas erradas
			myanswers: { notNull: true, dataType: 'string' }, //todas respostas separadas por vírgula, exemplo: "01a,02bc,03d,05a...". Exemplo com a resposta 04 não foi respondida.
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
        restartFase();
    });
    $('#btnIndexConfigurar').click(function () {
//		window.close();
		document.getElementById('btnIndexConfigurar').style.display = 'none';
		document.getElementById('lei13709').style.display = 'none';
		location.reload(); //recarrega página importando também o teste 01
		var DataShow_Config = window.open("config" + document.getElementById('selectMygroup').value + ".html?sim=" + document.getElementById('selectMygroup').value, "_self", "top=0, width=400, height=200, left=500, location=no, menubar=no, resizable=no, scrollbars=no, status=no, titlebar=no, toolbar=no");
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
		if (mygroup != '00') {
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
    $('#tblGrid tbody').on('click', '.edit', function () {
		var row = $(this).parents().eq(1);
        var child = row.children();
		var id = row.attr('itemid');
		var mygroup = child.eq(0).text();
		var mycode = child.eq(1).text();
		getFromTable(id, mygroup, mycode);
		showFormAddUpdate();
    });
    $('#tblGrid tbody').on('click', '.restart', function () {
		var row = $(this).parents().eq(1);
        var child = row.children();
		var myid = row.attr('itemid');
		var mygroup = child.eq(0).text();
		var mycode = child.eq(1).text();
		restartFase(myid, mygroup, mycode);
		savePoints(myid, mygroup, mycode);
		setTimeout(() => { location.reload() }, 1000); // Executa após meio segundo para esperar o processo
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
			refreshTableQuestion(id, mygroup, '1');
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
    $('#btnPlay').click(function () {
		var mygroup = document.getElementById('selectMygroup').value;
		refreshTableQuestion('', mygroup, '1');
		showFormSim();
    });	
    $('#btnPrevious').click(function () {
		var myid = document.getElementById('myidSim').value;
		var mygroup = document.getElementById('mygroupSim').value;
		var mycode = parseInt(document.getElementById('mycodeSim').value) - 1;
		if (mycode > 0) {
			refreshTableQuestion(myid, mygroup, mycode);
		}
//		changeFaseNivel(myid, mygroup, mycode);
    })
    $('#btnNext').click(function () {
		var myid = document.getElementById('myidSim').value;
		var mygroup = document.getElementById('mygroupSim').value;
		var mycode = parseInt(document.getElementById('mycodeSim').value) + 1;
		refreshTableQuestion(myid, mygroup, mycode);
//		changeFaseNivel(myid, mygroup, mycode);
		savePoints(myid, mygroup, mycode);
/*		if (mycode >= parseInt(document.getElementById('txtTotal').value)) {
			var result = confirm('Vou salvar a pontuação, ok?\n');
			if (result) {
				showGridAndHideForms();
				changeFaseNivel(myid, mygroup, mycode);
				setTimeout(() => { location.reload() }, 1000); // Executa após 2 segundos para esperar o processo de insert terminar
			}
		}
*/
    })
	$('#btnPause').click(function () {
		var myid = document.getElementById('myidSim').value;
		var mygroup = document.getElementById('mygroupSim').value;
		var mycode = parseInt(document.getElementById('mycodeSim').value) + 1;
//		changeFaseNivel(myid, mygroup, mycode);
		savePoints(myid, mygroup, mycode);
		showGridAndHideForms();
		setTimeout(() => { location.reload() }, 1000); // Executa após 1 segundo para esperar o processo
    });	
	$('#btnEnd').click(function () {
		var result = confirm('Vou salvar a pontuação e concluir, ok?\n');
		if (result) {
			var myid = document.getElementById('myidSim').value;
			var mygroup = document.getElementById('mygroupSim').value;
			var mycode = parseInt(document.getElementById('mycodeSim').value) + 1;
			changeFaseNivel(myid, mygroup, mycode);
			savePoints(myid, mygroup, mycode);
			showGridAndHideForms();
			setTimeout(() => { location.reload() }, 1000); // Executa após 1 segundo para esperar o processo
		}
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
	$('#selTextColor').change(function () {
		updateConfigGeneral();
    })
	$('#selBackground').change(function () {
		updateConfigGeneral();
    })
	$('#selButtonColor').change(function () {
		updateConfigGeneral();
    })
	$('#btnReview').change(function () {
		var mygroup = document.getElementById('selectMygroup').value;
		refreshTableQuestion('', mygroup, '1');
		showFormSim();
	})
	$('#btnCategory1Fase1').click(function () {
		refreshTableData('0', '', '', ''); // botão btnCategory1 carrega essa opção
		showGridAndHideForms();
		document.getElementById('txtControleNavegacao').value = '11';
		//var DataShow_Nivel = window.open("index.html?cat=1&fase=1", "_self");
	})
	$('#btnVersions').click(function () {
		var versions = 'Atualizações:';
		versions = versions + '\n' + '25.09.22 botão fechar x vermelho';
		versions = versions + '\n' + '25.09.22 coluna com porcentagem';
		versions = versions + '\n' + '26.09.22 navegação botões';
		alert(versions);
	})
	$('#btnRefresh').click(function () {
		location.reload();
	})
}

async function initConfigGeneral() {
//	document.getElementById('divconfig').style.display = 'block';
	GLOBAL_textcolor = 'black';
	GLOBAL_buttoncolor = 'btn-colors';
	try {
		var configgeneral = {
			fontfamily: 'Times New Roman',
			fontsize: '16',
			background: 'white',
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
	GLOBAL_textcolor = document.getElementById('selTextColor').value;
	GLOBAL_buttoncolor = document.getElementById('selButtonColor').value;
	setConfigGeneral(document.getElementById('selTextColor').value, document.getElementById('selBackground').value, document.getElementById('selButtonColor').value);

	var noOfDataUpdated = await jsstoreCon.update({
		in: 'ConfigGeneral',
		set: {
			fontfamily: 'Times New Roman',
			fontsize: '16',
			background: '' + document.getElementById('selBackground').value + '',
			textcolor: '' + document.getElementById('selTextColor').value + '',
			buttoncolor: '' + document.getElementById('selButtonColor').value + '',
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
	
	//carrega cor de fundo
	var varItens = document.getElementById('selTextColor');
	for(index = 0;index < varItens.length;index++)
	{
		if (varItens.options[index].value == GLOBAL_textcolor) {
			varItens.selectedIndex = index;
			break;
		}
	}	
	//carrega cor do texto
	var varItensFundo = document.getElementById('selBackground');
	for(index = 0;index < varItensFundo.length;index++)
	{
		if (varItensFundo.options[index].value == GLOBAL_background) {
			varItensFundo.selectedIndex = index;
			break;
		}
	}

	//carrega cor do botão
	var varItens = document.getElementById('selButtonColor');
	for(index = 0;index < varItens.length;index++)
	{
		if (varItens.options[index].value == GLOBAL_buttoncolor) {
			varItens.selectedIndex = index;
			break;
		}
	}
	
	setConfigGeneral(GLOBAL_textcolor, GLOBAL_background, GLOBAL_buttoncolor);
}

async function setConfigGeneral(textcolor, background, buttoncolor) {
	if(document.getElementById('email') != null) {
		document.getElementById('email').style.color = textcolor;
	}
	if(document.getElementById('version') != null) {
		document.getElementById('version').style.color = textcolor;
	}
	if(document.getElementById('FormularioEditorPerguntas') != null) {
		document.getElementById('FormularioEditorPerguntas').style.color = textcolor;
	}
	if(document.getElementById('FormularioEditorConfiguracoes') != null) {
		document.getElementById('FormularioEditorConfiguracoes').style.color = textcolor;
	}
	if(document.getElementById('lei13709') != null) {
		document.getElementById('lei13709').style.color = textcolor;
		document.getElementById('lei13709').style.backgroundColor = background;
	}
	document.getElementById('myBody').style.background = background;

	document.getElementById('selTextColor').style.color = textcolor;
	document.getElementById('selBackground').style.color = background;

	var classe = '';

	classe = document.getElementById('btnPrevious').classList.value;
	classe = classe.substring(4, classe.length);
	document.getElementById('btnPrevious').classList.remove(classe);

	if(document.getElementById('btnPause') != null) {
		classe = document.getElementById('btnPause').classList.value;
		classe = classe.substring(4, classe.length);
		document.getElementById('btnPause').classList.remove(classe);
	}

	classe = document.getElementById('btnBackward').classList.value;
	classe = classe.substring(4, classe.length);
	document.getElementById('btnBackward').classList.remove(classe);

	if(document.getElementById('btnPoints') != null) {
		classe = document.getElementById('btnPoints').classList.value;
		classe = classe.substring(4, classe.length);
		document.getElementById('btnPoints').classList.remove(classe);
	}

	classe = document.getElementById('btnNext').classList.value;
	classe = classe.substring(4, classe.length);
	document.getElementById('btnNext').classList.remove(classe);

	classe = document.getElementById('selButtonColor').classList.value;
	classe = classe.substring(4, classe.length);
	document.getElementById('selButtonColor').classList.remove(classe);

	if (buttoncolor == 'btn-colors') {
		document.getElementById('btnPrevious').classList.add('btn-info');
		if(document.getElementById('btnPause') != null) {
			document.getElementById('btnPause').classList.add('btn-danger');
		}
		document.getElementById('btnBackward').classList.add('btn-danger');
		if(document.getElementById('btnPoints') != null) {
			document.getElementById('btnPoints').classList.add('btn-info');
		}
		document.getElementById('btnNext').classList.add('btn-info');
		document.getElementById('selButtonColor').classList.add('btn-default');
	} else {
		document.getElementById('btnPrevious').classList.add(buttoncolor);
		document.getElementById('btnPause').classList.add(buttoncolor);
		document.getElementById('btnBackward').classList.add(buttoncolor);
		document.getElementById('btnPoints').classList.add(buttoncolor);
		document.getElementById('btnNext').classList.add(buttoncolor);
		document.getElementById('selButtonColor').classList.add(buttoncolor);
	}
}

function restartFase(myid, mygroup, mycode) {
	var result = confirm('Vou limpar e reiniciar as respostas dessa fase, ok?');
	if (result) {
		updateStudentPlayOrder(mygroup);
		updateStudentPlayClear(mygroup);
		showGridAndHideForms();
	}
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

function calculaPercentualAcerto(mygroup, mycode, totalCorretas, totalperguntas) {
	var calculo = (totalCorretas*100) / (parseInt(totalperguntas));
	calculo = calculo.toFixed(0); //remove decimais
	return calculo;
}

function getTotalCorretas(mygroup, mycode, students) {
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

function getTotalIncorretas(mygroup, mycode, students) {
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

function getTotalNaoRespondidas(mygroup, mycode, students) {
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

async function changeFaseNivel(id, mygroup, mycode) {
	var totalperguntas = await jsstoreCon.count({
		from: 'Student'
		  , where: {
			  mygroup: mygroup
		  }
	});
	totalperguntas = totalperguntas - 1; //tira a pergunta zero que é o título da lista de perguntas
	var students = await jsstoreCon.select({
		from: 'Student'
		  , where: { mygroup: mygroup 
		  }
	});
	var totalCorretas = getTotalCorretas(mygroup, mycode, students);
	var calculo = calculaPercentualAcerto(mygroup, mycode, totalCorretas, totalperguntas);
	if (calculo >= 70) {
		var mygroupNext = getProximaFaseNivel(id, mygroup, mycode);
		if (mygroupNext != 'false') {
			var students = await jsstoreCon.select({
				from: 'Student'
				  , where: { mygroup: '' + mygroupNext + ''
				}
			});
			if (students == '') {
				var DataShow_Config = window.open("config" + mygroupNext + ".html?sim=" + mygroupNext);
//				var DataShow_Config = window.open("config" + mygroupNext + ".html?sim=" + mygroupNext, "datashowconfig", "top=0, width=400, height=200, left=500, location=no, menubar=no, resizable=no, scrollbars=no, status=no, titlebar=no, toolbar=no");
			}
		}
	}
}

function getProximaFaseNivel(id, mygroup, mycode) {
	var unidade = parseInt(mygroup.substring(mygroup.length-1, mygroup.length));
	var dezena = parseInt(mygroup.substring(0, mygroup.substring(mygroup.length-1, mygroup.length)));
	if (unidade < CONST_NIVEL_MAX) {
		mygroup = parseInt(mygroup) + 1; //próxima fase
	} else {
		mygroup = String(parseInt(mygroup) + 10); //próximo nível
		mygroup = mygroup.substring(0, 1) + '0';
	}
	return mygroup;
}

async function savePoints(myid, mygroup, mycode) {
	var totalperguntas = await jsstoreCon.count({
		from: 'Student'
		  , where: {
			  mygroup: mygroup
		  }
	});
	totalperguntas = totalperguntas - 1; //tira a pergunta zero que é o título da lista de perguntas
	var students = await jsstoreCon.select({
		from: 'Student'
		  , where: { mygroup: mygroup 
		  }
	});
	var totalCorretas = getTotalCorretas(mygroup, mycode, students);
	var calculo = calculaPercentualAcerto(mygroup, mycode, totalCorretas, totalperguntas);

	var noOfDataUpdated = await jsstoreCon.update({
		in: 'Student',
		set: {
			mypoints: calculo
		},
		where: {
			mygroup: mygroup
		}
	});
}

async function showPoints(mygroup, mycode) {
	var students = await jsstoreCon.select({
		from: 'Student'
		  , where: { mygroup: mygroup 
		  }
	});
	var totalCorretas = getTotalCorretas(mygroup, mycode, students);
	var totalIncorretas = getTotalIncorretas(mygroup, mycode, students);
	var totalNaoRespondidas = getTotalNaoRespondidas(mygroup, mycode, students);

//alert('totalCorretas='+totalCorretas + ' totalIncorretas='+totalIncorretas + ' totalNaoRespondidas='+totalNaoRespondidas);

	var totalperguntas = await jsstoreCon.count({
		from: 'Student'
		  , where: {
			  mygroup: mygroup
		  }
	});
	totalperguntas = totalperguntas - 1; //tira a pergunta zero que é o título da lista de perguntas
	
	var resultado = '';
	resultado = resultado + totalIncorretas + ' erradas ';//+ erradas;
	resultado = resultado + '\n\n' + totalCorretas + ' corretas';
	resultado = resultado + '\n\n' + totalNaoRespondidas + ' não respondidas ';// + responder;
//	resultado = resultado + '\n\nResponda: '  + responder;
	var aprovacao = '';

	var calculo = calculaPercentualAcerto(mygroup, mycode, totalCorretas, totalperguntas);
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

async function setDashboard(myid, mygroup, mycode) {
		var totalperguntas = await jsstoreCon.count({
			from: 'Student'
			  , where: {
				  mygroup: mygroup
			  }
		});
		totalperguntas = parseInt(totalperguntas) - 1;
		
		var studentsDashboard = await jsstoreCon.select({
			from: 'Student'
			  , where: { mygroup: mygroup 
			  }
		});
		var totalCorretas = getTotalCorretas(mygroup, mycode, studentsDashboard);
		var totalIncorretas = getTotalIncorretas(mygroup, mycode, studentsDashboard);
		var totalNaoRespondidas = getTotalNaoRespondidas(mygroup, mycode, studentsDashboard);
		var calculo = calculaPercentualAcerto(mygroup, mycode, totalCorretas, totalperguntas);

//	alert('totalperguntas='+totalperguntas + ' totalCorretas='+totalCorretas + ' totalIncorretas='+totalIncorretas);

		document.getElementById('txtTotal').value = totalperguntas;
		document.getElementById('txtIncorretas').value = 'Incorretas: ' + totalIncorretas;
		document.getElementById('txtCorretas').value = 'Corretas: ' + totalCorretas;
		document.getElementById('txtNaoRespondidas').value = 'Não Respondidas: ' + totalNaoRespondidas;
		if (calculo >= 70) {
			document.getElementById('txtCalculo').innerHTML = 'JÁ ESTÁ APROVADO <br/>' + calculo + '% de acerto é >= 70%';
		} else {
			document.getElementById('txtCalculo').innerHTML = 'AINDA ESTÁ REPROVADO <br/>' + calculo + '% de acerto é < 70%';
		}
		

}

//This function select table play
async function refreshTableQuestion(myid, mygroup, mycode) {
//    try {
		var totalperguntas = await jsstoreCon.count({
			from: 'Student'
			  , where: {
				  mygroup: mygroup
			  }
		});
		totalperguntas = parseInt(totalperguntas) - 1;
		setDashboard(myid, mygroup, mycode);
		var students = await jsstoreCon.select({
			from: 'Student'
			  , where: { mygroup: '' + mygroup + ''
					   , mycode: '' + mycode + ''
			  }
		});
		if (students == '') {
			
		} else {
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

				document.getElementById('mytextSim').innerHTML = '<font color=' + GLOBAL_textcolor + '>' + ' <b>' + student.mycode + '/' + totalperguntas + '. ' + student.mytext + '</b> </font>';

				var myorder = student.myorder;
				myorder = myorder.replaceAll('\,', '');
				for (var index=0; index<=8; index++) {
					valorIndice = myorder.substring(index,index+1);
					if (valorIndice == '1') {
						var textlink = ''; var linkhref = '';
						if (document.getElementById(student.myoptionkey1) != null) {
							textlink = document.getElementById(student.myoptionkey1).innerHTML;
							linkhref = document.getElementById('link_' + student.myoptionkey1);
						}
						document.getElementById('mycorrect' + parseInt(index+1) + 'answer').innerHTML = 
	//					valorIndice +
						' <input onclick="showCorrect(' + valorIndice + ', ' + student.id + ', ' + student.mygroup + ', ' + student.mycode + ');" id="chkMycorrect' + valorIndice + 'answer" type=checkbox value=' + valorIndice + ' '
						+ student.mycorrect1answer + '> ' + '<font color=' + GLOBAL_textcolor + '>' +student.myoption1 + ' </font>'
						+ '<a href="#"><i class="fa fa-tag" onclick="alert(\'' + textlink.trim().replaceAll('<b>', '').replaceAll('</b>', '') + '\')"></i></a>'

	//					+ ' <a href="#' + student.myoption1 + '" class="btn btn-default"><b>?</b></a>'
						+ ' <zzz id=lblcorrect' + valorIndice + ' style="color:green; display:none"><i class="fa fa-check"></i> <b>correta</b>'
						+ '<p/>' + '<font color=' + GLOBAL_textcolor + '>' + textlink + '... </font>' + '</zzz>'
						+ '<br/><a href=' + linkhref + ' target="_blank">veja mais na internet</a>';
						if (student.myoption1 != '') {
							document.getElementById('mycorrect' + parseInt(index+1) + 'Sim').style.display='block';
						}
					} else if (valorIndice == '2') {
						var textlink = ''; var linkhref = '';
						if (document.getElementById(student.myoptionkey2) != null) {
							textlink = document.getElementById(student.myoptionkey2).innerHTML;
							linkhref = document.getElementById('link_' + student.myoptionkey2);
						}
						document.getElementById('mycorrect' + parseInt(index+1) + 'answer').innerHTML = 
	//					valorIndice +
						' <input onclick="showCorrect(' + valorIndice + ', ' + student.id + ', ' + student.mygroup + ', ' + student.mycode + ');" id="chkMycorrect' + valorIndice + 'answer" type=checkbox value=' + valorIndice + ' '
						+ student.mycorrect2answer + '> ' + '<font color=' + GLOBAL_textcolor + '>' +student.myoption2 + ' </font>'
						+ '<a href="#"><i class="fa fa-tag" onclick="alert(\'' + textlink.trim().replaceAll('<b>', '').replaceAll('</b>', '') + '\')"></i></a>'

	//					+ ' <a href="#' + student.myoption2 + '" class="btn btn-default"><b>?</b></a>'
						+ ' <zzz id=lblcorrect' + valorIndice + ' style="color:green; display:none"><i class="fa fa-check"></i> <b>correta</b>'
						+ '<p/>' + '<font color=' + GLOBAL_textcolor + '>' + textlink + '... </font>' + '</zzz>'
						+ '<br/><a href=' + linkhref + ' target="_blank">veja mais na internet</a>';
						if (student.myoption2 != '') {
							document.getElementById('mycorrect' + parseInt(index+1) + 'Sim').style.display='block';
						}
					} else if (valorIndice == '3') {
						var textlink = ''; var linkhref = '';
						if (document.getElementById(student.myoptionkey3) != null) {
							textlink = document.getElementById(student.myoptionkey3).innerHTML;
							linkhref = document.getElementById('link_' + student.myoptionkey3);
						}
						document.getElementById('mycorrect' + parseInt(index+1) + 'answer').innerHTML = 
	//					valorIndice +
						' <input onclick="showCorrect(' + valorIndice + ', ' + student.id + ', ' + student.mygroup + ', ' + student.mycode + ');" id="chkMycorrect' + valorIndice + 'answer" type=checkbox value=' + valorIndice + ' '
						+ student.mycorrect3answer + '> ' + '<font color=' + GLOBAL_textcolor + '>' +student.myoption3 + ' </font>'
						+ '<a href="#"><i class="fa fa-tag" onclick="alert(\'' + textlink.trim().replaceAll('<b>', '').replaceAll('</b>', '') + '\')"></i></a>'

	//					+ ' <a href="#' + student.myoption3 + '" class="btn btn-default"><b>?</b></a>'
						+ ' <zzz id=lblcorrect' + valorIndice + ' style="color:green; display:none"><i class="fa fa-check"></i> <b>correta</b>'
						+ '<p/>' + '<font color=' + GLOBAL_textcolor + '>' + textlink + '... </font>' + '</zzz>'
						+ '<br/><a href=' + linkhref + ' target="_blank">veja mais na internet</a>';
						if (student.myoption3 != '') {
							document.getElementById('mycorrect' + parseInt(index+1) + 'Sim').style.display='block';
						}
					} else if (valorIndice == '4') {
						var textlink = ''; var linkhref = '';
						if (document.getElementById(student.myoptionkey4) != null) {
							textlink = document.getElementById(student.myoptionkey4).innerHTML;
							linkhref = document.getElementById('link_' + student.myoptionkey4);
						}
						document.getElementById('mycorrect' + parseInt(index+1) + 'answer').innerHTML = 
	//					valorIndice +
						' <input onclick="showCorrect(' + valorIndice + ', ' + student.id + ', ' + student.mygroup + ', ' + student.mycode + ');" id="chkMycorrect' + valorIndice + 'answer" type=checkbox value=' + valorIndice + ' '
						+ student.mycorrect4answer + '> ' + '<font color=' + GLOBAL_textcolor + '>' +student.myoption4 + ' </font>'
						+ '<a href="#"><i class="fa fa-tag" onclick="alert(\'' + textlink.trim().replaceAll('<b>', '').replaceAll('</b>', '') + '\')"></i></a>'

	//					+ ' <a href="#' + student.myoption4 + '" class="btn btn-default"><b>?</b></a>'
						+ ' <zzz id=lblcorrect' + valorIndice + ' style="color:green; display:none"><i class="fa fa-check"></i> <b>correta</b>'
						+ '<p/>' + '<font color=' + GLOBAL_textcolor + '>' + textlink + '... </font>' + '</zzz>'
						+ '<br/><a href=' + linkhref + ' target="_blank">veja mais na internet</a>';
						if (student.myoption4 != '') {
							document.getElementById('mycorrect' + parseInt(index+1) + 'Sim').style.display='block';
						}
					} else if (valorIndice == '5') {
						var textlink = ''; var linkhref = '';
						if (document.getElementById(student.myoptionkey5) != null) {
							textlink = document.getElementById(student.myoptionkey5).innerHTML;
							linkhref = document.getElementById('link_' + student.myoptionkey5);
						}
						document.getElementById('mycorrect' + parseInt(index+1) + 'answer').innerHTML = 
	//					valorIndice +
						' <input onclick="showCorrect(' + valorIndice + ', ' + student.id + ', ' + student.mygroup + ', ' + student.mycode + ');" id="chkMycorrect' + valorIndice + 'answer" type=checkbox value=' + valorIndice + ' '
						+ student.mycorrect5answer + '> ' + '<font color=' + GLOBAL_textcolor + '>' +student.myoption5 + ' </font>'
						+ '<a href="#"><i class="fa fa-tag" onclick="alert(\'' + textlink.trim().replaceAll('<b>', '').replaceAll('</b>', '') + '\')"></i></a>'

	//					+ ' <a href="#' + student.myoption5 + '" class="btn btn-default"><b>?</b></a>'
						+ ' <zzz id=lblcorrect' + valorIndice + ' style="color:red; display:none"><i class="fa fa-remove"></i> <b>incorreta</b>'
						+ '<p/>' + '<font color=' + GLOBAL_textcolor + '>' + textlink + '... </font>' + '</zzz>'
						+ '<br/><a href=' + linkhref + ' target="_blank">veja mais na internet</a>';
						if (student.myoption5 != '') {
							document.getElementById('mycorrect' + parseInt(index+1) + 'Sim').style.display='block';
						}
					} else if (valorIndice == '6') {
						var textlink = ''; var linkhref = '';
						if (document.getElementById(student.myoptionkey6) != null) {
							textlink = document.getElementById(student.myoptionkey6).innerHTML;
							linkhref = document.getElementById('link_' + student.myoptionkey6);
						}
						document.getElementById('mycorrect' + parseInt(index+1) + 'answer').innerHTML = 
	//					valorIndice +
						' <input onclick="showCorrect(' + valorIndice + ', ' + student.id + ', ' + student.mygroup + ', ' + student.mycode + ');" id="chkMycorrect' + valorIndice + 'answer" type=checkbox value=' + valorIndice + ' '
						+ student.mycorrect6answer + '> ' + '<font color=' + GLOBAL_textcolor + '>' +student.myoption6 + ' </font>'
						+ '<a href="#"><i class="fa fa-tag" onclick="alert(\'' + textlink.trim().replaceAll('<b>', '').replaceAll('</b>', '') + '\')"></i></a>'

	//					+ ' <a href="#' + student.myoption6 + '" class="btn btn-default"><b>?</b></a>'
						+ ' <zzz id=lblcorrect' + valorIndice + ' style="color:red; display:none"><i class="fa fa-remove"></i> <b>incorreta</b>'
						+ '<p/>' + '<font color=' + GLOBAL_textcolor + '>' + textlink + '... </font>' + '</zzz>'
						+ '<br/><a href=' + linkhref + ' target="_blank">veja mais na internet</a>';
						if (student.myoption6 != '') {
							document.getElementById('mycorrect' + parseInt(index+1) + 'Sim').style.display='block';
						}
					} else if (valorIndice == '7') {
						var textlink = ''; var linkhref = '';
						if (document.getElementById(student.myoptionkey7) != null) {
							textlink = document.getElementById(student.myoptionkey7).innerHTML;
							linkhref = document.getElementById('link_' + student.myoptionkey7);
						}
						document.getElementById('mycorrect' + parseInt(index+1) + 'answer').innerHTML = 
	//					valorIndice +
						' <input onclick="showCorrect(' + valorIndice + ', ' + student.id + ', ' + student.mygroup + ', ' + student.mycode + ');" id="chkMycorrect' + valorIndice + 'answer" type=checkbox value=' + valorIndice + ' '
						+ student.mycorrect7answer + '> ' + '<font color=' + GLOBAL_textcolor + '>' +student.myoption7 + ' </font>'
						+ '<a href="#"><i class="fa fa-tag" onclick="alert(\'' + textlink.trim().replaceAll('<b>', '').replaceAll('</b>', '') + '\')"></i></a>'

	//					+ ' <a href="#' + student.myoption7 + '" class="btn btn-default"><b>?</b></a>'
						+ ' <zzz id=lblcorrect' + valorIndice + ' style="color:red; display:none"><i class="fa fa-remove"></i> <b>incorreta</b>'
						+ '<p/>' + '<font color=' + GLOBAL_textcolor + '>' + textlink + '... </font>' + '</zzz>'
						+ '<br/><a href=' + linkhref + ' target="_blank">veja mais na internet</a>';
						if (student.myoption7 != '') {
							document.getElementById('mycorrect' + parseInt(index+1) + 'Sim').style.display='block';
						}
					} else if (valorIndice == '8') {
						var textlink = ''; var linkhref = '';
						if (document.getElementById(student.myoptionkey8) != null) {
							textlink = document.getElementById(student.myoptionkey8).innerHTML;
							linkhref = document.getElementById('link_' + student.myoptionkey8);
						}
						document.getElementById('mycorrect' + parseInt(index+1) + 'answer').innerHTML = 
	//					valorIndice +
						' <input onclick="showCorrect(' + valorIndice + ', ' + student.id + ', ' + student.mygroup + ', ' + student.mycode + ');" id="chkMycorrect' + valorIndice + 'answer" type=checkbox value=' + valorIndice + ' '
						+ student.mycorrect8answer + '> ' + '<font color=' + GLOBAL_textcolor + '>' +student.myoption8 + ' </font>'
						+ '<a href="#"><i class="fa fa-tag" onclick="alert(\'' + textlink.trim().replaceAll('<b>', '').replaceAll('</b>', '') + '\')"></i></a>'

	//					+ ' <a href="#' + student.myoption8 + '" class="btn btn-default"><b>?</b></a>'
						+ ' <zzz id=lblcorrect' + valorIndice + ' style="color:red; display:none"><i class="fa fa-remove"></i> <b>incorreta</b>'
						+ '<p/>' + '<font color=' + GLOBAL_textcolor + '>' + textlink + '... </font>' + '</zzz>'
						+ '<br/><a href=' + linkhref + ' target="_blank">veja mais na internet</a>';
						if (student.myoption8 != '') {
							document.getElementById('mycorrect' + parseInt(index+1) + 'Sim').style.display='block';
						}
					}
				}
			})
		}
		
//    } catch (ex) {
//        console.log(ex.message)
//    }	
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
				, order: [ {by: 'mygroup', type: 'desc'}, {by: 'mycode'} ]
			});
		}

		if (mygroup != '' && mycode == '') {
			var students = await jsstoreCon.select({
				from: 'Student'
					, where: { mygroup: '' + mygroup + ''
				}
				, order: [ {by: 'mygroup', type: 'desc'}, {by: 'mycode'} ]
			});
		}

		if (mygroup == '' && mycode != '') {
			var students = await jsstoreCon.select({
				from: 'Student'
					, where: { mycode: '' + mycode + ''
				}
				, order: [ {by: 'mygroup', type: 'desc'}, {by: 'mycode'} ]
			});
		}

		var htmlString = "";
		var varTdTh = '';
		var varButtonPlayStyle = 'color:blue; font-size:26px;';
		var varButtonPlay = '<br/><i class=\"fa fa-play\" style="' + varButtonPlayStyle + '"></i></a>';
		var varButtonUnlock = ''; //'<i class=\"fa fa-unlock\" style="' + varButtonPlayStyle + '"></i>';
//		var varText = '';
//		var varPlay = '';
		var varRestart = '';
		var varEdit = '';
		var varDel = '';
		var htmlStringButtons = ""; //getButtonsBar();

		students.forEach(function (student) {
			if (student.mycode == '0') {
				varTdTh = 'th';
//				varPlay = "<a href=\"#\" class=\"playsim\" style=\"color:#00FF00;\">Start</a>";
//				varEdit = "&nbsp;<a href=\"#\" class=\"edit\" style=\"color:#0000FF;\">Edit</a>";
				varRestart = "&nbsp;<i class=\"fa fa-refresh\"></i> <a href=\"#\" class=\"restart\" style=\"color:#0000FF;\">refazer</a>";
//				varDel = "&nbsp;<a href=\"#\" class=\"delete\" style=\"color:#FF0000;\">Del</a>";
			} else {
				varTdTh = 'td';
//				varPlay = "<a href=\"#\" class=\"playsim\"><i class=\"fa fa-play\" style=\"color:#00FF00; height:25px; Xwidth:25px; \"></i></a>";
//				varEdit = "<a href=\"#\" class=\"edit\"><i class=\"fa fa-pencil\" style=\"color:#0000FF; height:25px; Xwidth:25px; \"></i></a>";
				varRestart = "<a href=\"#\" class=\"restart\"><i class=\"fa fa-refresh\" style=\"color:#0000FF; height:25px; Xwidth:25px; \"></i></a>";
//				varDel = "<a href=\"#\" class=\"delete\"><i class=\"fa fa-times\" style=\"color:#FF0000; height:25px; Xwidth:25px;\"></i></a>";
			}
			
			htmlString += "<tr ItemId=" + student.id + ">"
				+ "<td style=\"color:#000000; font-size:1px; \">" + student.mygroup + "</td>"
//              + "<td style=\"color:#000000; font-size:1px;\">" + student.mycode + "</td>"
				+ "<" + varTdTh + " id=datashow" + student.id+"3" + " tabIndex=" + student.id+"3" + " ZZZonClick=\"datashow('" + student.id+"3" + "', 3, '" + student.mycode + "');\" onkeyup=\"moveCursor('" + student.mycode + "', 3, event, " + "" + (student.id+"3") + ");\" data-show='" + student.id+"3" + "'>"
				+ "<a href=\"#\" class=\"playsim\">" + varButtonUnlock + ' ' + student.mytext + ' ' + varButtonPlay + "</a></" + varTdTh + ">"
				+ "<" + varTdTh + ">" + student.mypoints + "%" + "</" + varTdTh + ">"
//				+ "<a href=\"#\" class=\"playsim\">" + student.mytext + varButtonPlay + "</" + varTdTh + ">"
//				+ student.mytext + "</" + varTdTh + ">"
/*				
				+ "<" + varTdTh + " id=datashow" + student.id+"4" + " tabIndex=" + student.id+"4" + " ZZZonClick=\"datashow('" + student.id+"4" + "', 4, '" + student.mycode + "');\" onkeyup=\"moveCursor('" + student.mycode + "', 4, event, " + "" + (student.id+"4") + ");\" data-show='" + student.id+"4" + "'>"
//				+ varPlay + "</" + varTdTh + ">"
				
				+ "<" + varTdTh + " id=datashow" + student.id+"5" + " tabIndex=" + student.id+"5" + " ZZZonClick=\"datashow('" + student.id+"5" + "', 5, '" + student.mycode + "');\" onkeyup=\"moveCursor('" + student.mycode + "', 5, event, " + "" + (student.id+"5") + ");\" data-show='" + student.id+"5" + "'>"
				+ varEdit + "</" + varTdTh + ">"
*/				
				+ "<" + varTdTh + " nowrap id=datashow" + student.id+"6" + " tabIndex=" + student.id+"6" + " ZZZonClick=\"datashow('" + student.id+"6" + "', 6, '" + student.mycode + "');\" onkeyup=\"moveCursor('" + student.mycode + "', 6, event, " + "" + (student.id+"6") + ");\" data-show='" + student.id+"6" + "'>"
//				+ varPlay + ' '
				+ varRestart + ' '
//				+ varEdit + ' '
//				+ '<p/>'
//				+ varDel
				+ "</" + varTdTh + ">"
				;
				
				varButtonPlayStyle = 'color:gray; font-size:15px;';
				varButtonPlay = '<i class=\"fa fa-check\" style="' + varButtonPlayStyle + '"></i>';
				varButtonUnlock = '<i class=\"fa fa-unlock\" style="' + varButtonPlayStyle + '"></i>';
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
	var result = confirm('Todas informações serão perdidas e reiniciadas, ok?');
	if (result) {
		jsstoreCon.dropDb().then(function() {
			console.log('Db deleted successfully');
			var mycode = document.getElementById('mycode').value;
			var myorder = document.getElementById('myorder').value;
			var mygroup = document.getElementById('mygroup').value;
			var mytext = document.getElementById('mytext').value.trim();
			refreshTableData(mycode, myorder, mygroup, mytext);
			location.reload();
//			console.log('successfull');
		}).catch(function(error) {
			console.log(error);
		});
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
	setTimeout(() => { document.getElementById('tblGrid').style.display='none'; }, 1000); // Executa após 1 segundo para esperar o processo terminar
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
				setTimeout(() => { refreshTableData(mycode, myorder, mygroup, mytext) }, 1000); // Executa novamente a cada 500 milisegundos
				
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
		myoptionkey8: $('#myoptionkey8').val(),
		mypoints: '0'
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

function getLinkHelp(keylink, hreflink, boldlink, textlink) {
	var withbold = textlink.replaceAll(boldlink, '<b>' + boldlink + '</b>');
	var linkhelp = '';
	linkhelp = linkhelp + '<p/><a href="#top" class="btn btn-default"><i class="fa fa-arrow-up"></i></a>';
	linkhelp = linkhelp + '<b> ' + keylink + '</b>';
	linkhelp = linkhelp + '<br/><i id="' + keylink + '" value="' + hreflink + '"> ' + withbold + '</i>';
	linkhelp = linkhelp + '<br/><a id="link_' + keylink + '" href=' + hreflink + ' target="_blank">veja mais na internet</a>';

	if (keylink == '') {
		return '';
	} else {
		return linkhelp;
	}
}

function initLinkHelp() {
	var linkhelp = ' <b>MINHA AJUDA</b> <br/><br/>';

	linkhelp = linkhelp + getLinkHelp('Princing Calculator', 'https://calculator.aws/#/', 'estimar o custo antes do uso, antes da implementação', 'AWS Princing Calculator para estimar o custo antes do uso, antes da implementação para sua solução de arquitetura. Configure uma estimativa de custo exclusivo que atenda às suas necessidades de negócios ou pessoais com produtos e serviços da AWS.');
	linkhelp = linkhelp + getLinkHelp('Organizations', 'https://aws.amazon.com/pt/organizations/?nc2=type_a', 'alocar recursos, agrupar contas', 'AWS Organizations para criar novas contas da AWS e alocar recursos, agrupar contas para organizar seus fluxos de trabalho, aplicar políticas a contas ou grupos para governança e simplificar o faturamento usando um único método de pagamento para todas as suas contas.');
	linkhelp = linkhelp + getLinkHelp('Billing', 'https://aws.amazon.com/pt/aws-cost-management/aws-billing/', 'visualizar e pagar faturas', 'AWS Billing é para entender seus gastos com a AWS, visualizar e pagar faturas, gerenciar preferências de faturamento e configurações de impostos e acessar serviços adicionais de Gerenciamento financeiro na nuvem. Avalie rapidamente se os seus gastos mensais estão alinhados a períodos anteriores, previsões ou orçamentos e investigue e tome medidas corretivas em tempo hábil.');
	linkhelp = linkhelp + getLinkHelp('Cost Explorer', 'https://aws.amazon.com/pt/aws-cost-management/aws-cost-explorer/', 'relacionado ao gasto que já passou', 'AWS Cost Explorer permite visualizar, entender e gerenciar os custos e o uso da AWS ao longo do tempo relacionado ao gasto que já passou.');
	linkhelp = linkhelp + getLinkHelp('Well-Architected Framework', 'https://docs.aws.amazon.com/pt_br/AWSEC2/latest/UserGuide/concepts.html', 'Os pilares são', 'Os pilares são: <br/>Excelência operacional, <br/>Segurança, <br/>Confiabilidade, <br/>Eficiência de desempenho, <br/>Otimização de custos, <br/>Sustentabilidade');
	linkhelp = linkhelp + getLinkHelp('Não Se Aplica', 'https://docs.aws.amazon.com/pt_br/AWSEC2/latest/UserGuide/concepts.html', 'Não Se Aplica', 'Não Se Aplica na AWS');
	linkhelp = linkhelp + getLinkHelp('EC2', 'https://docs.aws.amazon.com/pt_br/AWSEC2/latest/UserGuide/concepts.html', 'computação escalável na Nuvem da Amazon Web Services (AWS)', 'O Amazon EC2 (Elastic Compute Cloud) oferece uma capacidade de computação escalável na Nuvem da Amazon Web Services (AWS). O uso do Amazon EC2 elimina a necessidade de investir em hardware inicialmente, portanto, você pode desenvolver e implantar aplicativos com mais rapidez.');
	linkhelp = linkhelp + getLinkHelp('S3', 'https://docs.aws.amazon.com/pt_br/AWSEC2/latest/UserGuide/concepts.html', 'armazenamento de objetos que armazena dados como objetos em buckets (exemplo de arquivos estáticos: .html, .js, .cs', 'O Amazon S3 (Simple Storage Service) é um serviço de armazenamento de objetos que armazena dados como objetos em buckets (exemplo de arquivos estáticos: .html, .js, .cs.). A capacidade é virtualmente ilimitada. Um objeto é um arquivo e quaisquer metadados que descrevam o arquivo. Um bucket é um contêiner de objetos. Você pode controlar o acesso a grupos de objetos que começam com um prefixo ou termine com uma determinada extensão.');
	linkhelp = linkhelp + getLinkHelp('Storage Classes', 'https://aws.amazon.com/pt/s3/storage-classes/', 'armazenamento de objetos', 'Opção padrão (default) de armazenamento de objetos com altos níveis de resiliência, disponibilidade e performance para dados acessados com frequência. Tem baixa latência e alto throughput.<br/>1 Standard (padrão),<br/>2 Intelligent Tiering,<br/>3 Standard-IA,<br/>4 One Zone-IA,<br/>5 Glacier Instant Retrieval,<br/>6 Glacier Flexible,<br/>7 Glacier Deep Archive,<br/>8 Outposts.');
	linkhelp = linkhelp + getLinkHelp('Frequent Access', 'https://aws.amazon.com/pt/s3/storage-classes/', 'S3 Intelligent-Tiering', 'Frequent Access (Acesso Frequente) está contida na S3 Intelligent-Tiering (camada inteligente) oferece latência de milissegundos e alta performance de taxa de transferência para dados acessados com muita frequência, com pouca frequência e raramente acessados nos níveis Frequent Access, Infrequent Access e o Archive Instant Access.');
	linkhelp = linkhelp + getLinkHelp('Infrequent Access', 'https://aws.amazon.com/pt/s3/storage-classes/', 'dados acessados com menos frequência, mas que exigem acesso rápido', 'Infrequent Access (Acesso Infrequente) do S3 Standard-IA é indicado para dados acessados com menos frequência, mas que exigem acesso rápido quando necessários. Oferece os altos níveis de resiliência e throughput e a baixa latência. Combina baixo custo e alta performance.');
	linkhelp = linkhelp + getLinkHelp('Glacier', 'https://docs.aws.amazon.com/pt_br/amazonglacier/latest/dev/introduction.html', 'custo extremamente baixo', 'Armazenamento de objetos da classe S3, opção Glacier é uma classe de armazenamento do Amazon S3 segura, durável e de custo extremamente baixo para arquivamento de dados e backup de longo prazo.');
	linkhelp = linkhelp + getLinkHelp('Intelligent Tiering', 'https://aws.amazon.com/pt/s3/storage-classes/', '', 'Intelligent Tiering (Camada Inteligente) oferece latência de milissegundos e alta performance de taxa de transferência para dados acessados com muita frequência, com pouca frequência e raramente acessados nos níveis Frequent Access, Infrequent Access e o Archive Instant Access.');
	linkhelp = linkhelp + getLinkHelp('Standard', 'https://aws.amazon.com/pt/s3/storage-classes/', 'é o mais caro', 'Armazenamento de objetos da classe S3, opção Standard (Padrão) é o mais caro e oferece um armazenamento de objetos com altos níveis de resiliência, disponibilidade e performance para dados acessados com frequência. Como fornece baixa latência e alto throughput.');
	linkhelp = linkhelp + getLinkHelp('SNS', 'https://aws.amazon.com/pt/sns/?whats-new-cards.sort-by=item.additionalFields.postDateTime&whats-new-cards.sort-order=desc', 'baseados em push', 'Amazon SNS (Simple Notification Service) é um serviço de mensagens totalmente gerenciado para a comunicação de aplicação para aplicação (A2A) e de aplicação para pessoa (A2P). A funcionalidade pub/sub de A2A fornece tópicos para sistemas de mensagens de alta taxa de transferência baseados em push.');
	linkhelp = linkhelp + getLinkHelp('SES', 'https://docs.aws.amazon.com/pt_br/ses/latest/dg/Welcome.html', 'plataforma de e-mail', 'Amazon SES (Simple Email Service) é uma plataforma de e-mail que oferece uma forma fácil e econômica para você enviar e receber e-mail usando seus próprios endereços de e-mail e domínios.');
	linkhelp = linkhelp + getLinkHelp('SQS', 'https://aws.amazon.com/pt/sqs/', 'filas de mensagens', 'Amazon SQS (Simple Queue Service) oferece uma fila hospedada segura, durável e disponível que permite integrar e desacoplar sistemas de software e componentes distribuídos. O Amazon SQS oferece construções comuns, como filas de mensagens mortas e tags de alocação de custos.');
	linkhelp = linkhelp + getLinkHelp('Modelo de uso', 'https://aws.amazon.com/pt/free/free-tier-faqs/', 'composto por três tipos', 'O nível gratuito da AWS oferece aos clientes a capacidade de explorar e testar gratuitamente serviços da AWS até os limites especificados para cada serviço. O nível gratuito é composto por três tipos diferentes de ofertas: um nível gratuito de 12 meses, uma oferta Always Free e testes de curto prazo.');
	linkhelp = linkhelp + getLinkHelp('Open Source', 'https://www.redhat.com/pt-br/topics/open-source/what-is-open-source', '', 'Open Source é um termo que se refere ao software open source (OSS). Ele é um código projetado para ser acessado abertamente pelo público: todas as pessoas podem vê-lo, modificá-lo e distribuí-lo conforme suas necessidades.');
	linkhelp = linkhelp + getLinkHelp('RDS', 'https://aws.amazon.com/pt/rds/', 'facilita a configuração, operação e escalabilidade de bancos de dados na nuvem', 'O Amazon Relational Database Service (Amazon RDS) é uma coleção de serviços gerenciados que facilita a configuração, operação e escalabilidade de bancos de dados na nuvem. Escolha entre sete opções de mecanismos bastante utilizados: Amazon Aurora compatível com MySQL, Amazon Aurora compatível com PostgreSQL, MySQL, MariaDB, PostgreSQL, Oracle e SQL Server.');
	linkhelp = linkhelp + getLinkHelp('DynamoDB', 'https://aws.amazon.com/pt/dynamodb/', 'chave-valor NoSQL', 'AWS DynamoDB é um banco de dados de chave-valor NoSQL, sem servidor e totalmente gerenciado, projetado para executar aplicações de alta performance em qualquer escala.');
	linkhelp = linkhelp + getLinkHelp('MariaDB', 'https://aws.amazon.com/pt/rds/mariadb/', '', 'MariaDB é um banco de dados relacional de código aberto conhecido no mercado, que foi criado pelos desenvolvedores originais do MySQL. O Amazon RDS facilita a configuração, a operação e a escalabilidade de implantações do servidor MariaDB na nuvem.');
	linkhelp = linkhelp + getLinkHelp('MySql', 'https://aws.amazon.com/pt/rds/mysql/', '', 'MySql é um banco de dados relacional de código aberto mais popular do mundo e o Amazon RDS facilita a configuração, a operação e a escalabilidade de implantações de MySQL na nuvem. Com o Amazon RDS, você pode implantar em minutos servidores MySQL escaláveis com capacidade de hardware econômica e redimensionável.');
	linkhelp = linkhelp + getLinkHelp('SQL Server', 'https://aws.amazon.com/pt/rds/sqlserver/', '', 'SQL Server é um sistema de gerenciamento de bancos de dados relacionais desenvolvido pela Microsoft. O Amazon RDS for SQL Server facilita a configuração, a operação e a escalabilidade de implantações do SQL Server na nuvem.');
	linkhelp = linkhelp + getLinkHelp('STS', 'https://aws.amazon.com/pt/about-aws/whats-new/2019/04/aws-security-token-service-sts-now-supports-enabling-the-global-sts-endpoint-to-issue-session-tokens-compatible-with-all-aws-regions/', 'emissão de tokens de sessão', 'AWS STS (Security Token Service) oferece suporte à habilitação do endpoint global do STS para emissão de tokens de sessão compatíveis com todas as regiões da AWS.');
	linkhelp = linkhelp + getLinkHelp('SSH', 'https://docs.aws.amazon.com/pt_br/AWSEC2/latest/UserGuide/ec2-key-pairs.html', '', 'SSH (Secure Socket Shell) é um par de chaves, que consiste em uma chave pública e uma chave privada, trata-se de um conjunto de credenciais de segurança usadas para provar sua identidade ao se conectar a uma instância do Amazon EC2.');
	linkhelp = linkhelp + getLinkHelp('Storage Gateway', 'https://aws.amazon.com/pt/storagegateway/', 'acesso on-premises para armazenamento virtual na nuvem', 'AWS Storage Gateway é um conjunto de serviços de armazenamento na nuvem híbrida que oferece acesso on-premises para armazenamento virtual na nuvem praticamente ilimitado.');
	linkhelp = linkhelp + getLinkHelp('VPC', 'https://aws.amazon.com/pt/vpc/', 'lança recursos da AWS em uma rede virtual isolada logicamente', 'O AWS VPC (Virtual Private Cloud) define e lança recursos da AWS em uma rede virtual isolada logicamente. Oferece controle total sobre seu ambiente de redes virtual, incluindo posicionamento de recursos, conectividade e segurança.');
	linkhelp = linkhelp + getLinkHelp('DMS', 'https://aws.amazon.com/pt/dms/', 'migrar bancos de dados', 'AWS DMS (Database Migration Service), ajuda você a migrar bancos de dados para a AWS de modo rápido e seguro. O banco de dados de origem permanece totalmente operacional durante a migração, minimizando o tempo de inatividade de aplicações que dependem do banco de dados.');
	linkhelp = linkhelp + getLinkHelp('KMS', 'https://docs.aws.amazon.com/pt_br/kms/latest/developerguide/overview.html', 'chaves criptográficas', 'AWS KMS (Key Management Service) é um serviço gerenciado que facilita a criação e o controle de chaves criptográficas usadas para proteger os dados. Para proteger e validar suas AWS KMS keys, o AWS KMS usa módulos de segurança de hardware (HSMs) de acordo com o Programa de validação de módulos criptográficos FIPS 140-2.');
	linkhelp = linkhelp + getLinkHelp('EFS', 'https://aws.amazon.com/pt/efs/', 'sistema de arquivos simples, não objetos', 'AWS EFS (Elastic File System) é um sistema de arquivos simples, não objetos (como: html, js, css), e sem servidor para definição única que facilita a configuração, a escalabilidade e a otimização de custos do armazenamento de arquivos na AWS.');
	linkhelp = linkhelp + getLinkHelp('AWS Audit Manager', 'https://aws.amazon.com/pt/audit-manager/', '', 'O AWS Audit Manager ajuda a auditar continuamente seu uso da AWS para simplificar sua forma de avaliar os riscos e a compatibilidade com os regulamentos e padrões do setor. O Audit Manager automatiza a coleta de evidências para reduzir o esforço manual coletivo que costuma acontecer durante as auditorias e permite escalar sua capacidade de auditoria na nuvem à medida que sua empresa cresce.');
	linkhelp = linkhelp + getLinkHelp('Config', 'https://aws.amazon.com/pt/config/', 'acessar, auditar e avaliar as configurações', 'AWS Config é um serviço que permite acessar, auditar e avaliar as configurações dos recursos da AWS. Você pode analisar alterações feitas nas configurações e relacionamentos entre os recursos da AWS, aprofundar-se de forma detalhada no histórico de configuração de recursos e determinar a conformidade geral em relação às configurações especificadas em suas diretrizes internas.');
	linkhelp = linkhelp + getLinkHelp('Athena', 'https://aws.amazon.com/pt/athena/?whats-new-cards.sort-by=item.additionalFields.postDateTime&whats-new-cards.sort-order=desc', 'consultas interativas usando SQL padrão', 'AWS Athena é um serviço de consultas interativas usando SQL padrão que facilita a análise de dados no Amazon S3. O Athena não precisa de servidor. Portanto, não há infraestrutura para gerenciar e você paga apenas pelas consultas executadas.');
	linkhelp = linkhelp + getLinkHelp('RedShift', 'https://docs.aws.amazon.com/pt_br/redshift/latest/mgmt/welcome.html', 'Data Warehouse', 'AWS RedShift é um serviço de Data Warehouse em escala de petabytes totalmente gerenciado na nuvem. Permite usar os dados para adquirir novos insights para seus negócios e clientes.');
	linkhelp = linkhelp + getLinkHelp('Aurora', 'https://docs.aws.amazon.com/pt_br/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html', 'banco de dados relacional', 'O Amazon Aurora é um mecanismo de banco de dados relacional gerenciado compatível com o MySQL e o PostgreSQL. O Aurora pode oferecer até cinco vezes a taxa de processamento do MySQL e até três vezes a taxa de processamento do PostgreSQL. Oferecer disponibilidade superior a 99,99% replicando seis cópias dos seus dados em três zonas diferentes.');
	linkhelp = linkhelp + getLinkHelp('EMR', 'https://aws.amazon.com/pt/emr/', 'Big Data', 'AWS EMR (Amazon Elastic MapReduce) é uma plataforma de Big Data em nuvem usada para executar trabalhos de processamento de dados distribuídos em grande escala, consultas SQL interativas e aplicações de machine learning (ML).');
	linkhelp = linkhelp + getLinkHelp('CloudTrail', 'https://docs.aws.amazon.com/pt_br/awscloudtrail/latest/userguide/cloudtrail-user-guide.html', 'monitora e registra a atividade da conta por toda a infraestrutura', 'AWS CloudTrail rastreia atividades dos usuários e uso de APIs. O AWS CloudTrail monitora e registra a atividade da conta por toda a infraestrutura da AWS, oferecendo controle sobre o armazenamento, análise e ações de remediação.');
	linkhelp = linkhelp + getLinkHelp('CloudSearch', 'https://aws.amazon.com/pt/cloudsearch/', 'pesquisa para o site ou aplicativo', 'AWS CloudSearch é um serviço gerenciado na nuvem AWS com o qual é possível configurar, gerenciar e dimensionar uma solução de pesquisa para o site ou aplicativo de forma simples e econômica.');
	linkhelp = linkhelp + getLinkHelp('ElasticSearch', 'https://aws.amazon.com/pt/opensearch-service/the-elk-stack/what-is-elasticsearch/', 'análises de log', 'AWS ElasticSearch é um mecanismo distribuído de pesquisa e análise usado para casos de uso de análises de log. Foi introduzido o projeto OpenSearch que é uma bifurcação do Elasticsearch e Kibana de código aberto.');
	linkhelp = linkhelp + getLinkHelp('Lambda', 'https://docs.aws.amazon.com/pt_br/lambda/latest/dg/welcome.html', 'permite que você execute o código sem provisionar ou gerenciar servidores', 'AWS Lambda é um serviço de computação que permite que você execute o código sem provisionar ou gerenciar servidores. O Lambda executa seu código em uma infraestrutura de computação de alta disponibilidade e executa toda a administração dos recursos computacionais, inclusive a manutenção do servidor e do sistema operacional, o provisionamento e a escalabilidade automática da capacidade e o monitoramento e o registro em log do código.');
	linkhelp = linkhelp + getLinkHelp('Shield', 'https://aws.amazon.com/pt/shield/?whats-new-cards.sort-by=item.additionalFields.postDateTime&whats-new-cards.sort-order=desc', 'proteção contra DDoS', 'AWS Shield é um serviço gerenciado de proteção contra DDoS (Negação de serviço distribuída) que protege os aplicativos executados na AWS. O AWS Shield oferece de detecção e mitigações em linha automáticas e sempre ativas que minimizam o tempo de inatividade e a latência dos aplicativos, fornecendo proteção contra DDoS sem necessidade de envolver o AWS Support. O AWS Shield tem dois níveis, Standard e Advanced.');
	linkhelp = linkhelp + getLinkHelp('WAF', 'https://aws.amazon.com/pt/waf/', 'firewall de aplicações Web', 'AWS WAF é um firewall de aplicações Web que ajuda a proteger suas aplicações Web ou APIs contra bots e exploits comuns na Web que podem afetar a disponibilidade, comprometer a segurança ou consumir recursos em excesso. O AWS WAF oferece controle sobre como o tráfego atinge suas aplicações, permitindo que você crie regras de segurança que controlam o tráfego de bots e bloqueiam padrões de ataque comuns, como injeção de SQL ou cross-site scripting.');
	linkhelp = linkhelp + getLinkHelp('Security Group', 'https://docs.aws.amazon.com/pt_br/AWSEC2/latest/UserGuide/ec2-security-groups.html', 'controlar o tráfego de entrada e de saída', 'Security Group é um grupo de segurança atua como firewall virtual para as instâncias do EC2 visando controlar o tráfego de entrada e de saída.');
	linkhelp = linkhelp + getLinkHelp('GuardDuty', 'https://aws.amazon.com/pt/guardduty/', 'detecção de ameaças que monitora continuamente', 'GuardDuty é um serviço de detecção de ameaças que monitora continuamente suas contas e workloads da AWS para detectar atividade maliciosa e entrega resultados de segurança detalhados para visibilidade e correção.');
	linkhelp = linkhelp + getLinkHelp('Graph', 'https://www.padowan.dk/doc/portuguese/Introduction.html', '', 'Amazon Graph é um conceito para traçar gráficos de funções matemáticas e outras curvas de natureza similar, em um sistema de coordenadas.');
	linkhelp = linkhelp + getLinkHelp('Neptune', 'https://aws.amazon.com/pt/neptune/', 'serviço de banco de dados de grafos', 'Amazon Neptune é um serviço de banco de dados de grafos rápido, confiável e totalmente gerenciado que facilita a criação e a execução de aplicativos na AWS. O núcleo do Neptune é um mecanismo de banco de dados gráfico com projeto específico e alta performance.');
	linkhelp = linkhelp + getLinkHelp('Neo4j', 'https://neo4j.com/partners/amazon/', '', 'Amazon Neo4j trabalha com a AWS (partner). Capacita desenvolvedores e cientistas de dados a criar rapidamente aplicativos escaláveis ​​e orientados por IA ou analisar big data com algoritmos. Como um banco de dados gráfico nativo criado para armazenar dados e conectar os relacionamentos, o Neo4j permite insights rápidos e profundamente contextuais.');
	linkhelp = linkhelp + getLinkHelp('JanusGraph', 'https://janusgraph.org/', '', 'Amazon JanusGraph trabalha com a AWS (partner). É um banco de dados (open source) gráfico escalável otimizado para armazenar e consultar gráficos contendo centenas de bilhões de vértices e arestas distribuídos em um cluster de várias máquinas.');
	linkhelp = linkhelp + getLinkHelp('Docker', 'https://aws.amazon.com/pt/docker/', '', 'Docker é uma plataforma de software que permite a criação, o Nível e a implantação de aplicações rapidamente. O Docker permite executar o código de maneira padronizada. O Docker é um sistema operacional para contêineres. Da mesma maneira que uma máquina virtual virtualiza.');
	linkhelp = linkhelp + getLinkHelp('AMI', 'https://docs.aws.amazon.com/pt_br/AWSEC2/latest/UserGuide/ec2-instances-and-amis.html', 'imagem de uma máquina virtual', 'AWS AMI (Imagem de Máquina da Amazon) é uma Imagem de Máquina da Amazon (AMI) é uma imagem de uma máquina virtual suportada e mantida pela AWS que fornece as informações necessárias para iniciar uma instância.');
	linkhelp = linkhelp + getLinkHelp('MFA', 'https://docs.aws.amazon.com/pt_br/IAM/latest/UserGuide/id_credentials_mfa.html#id_credentials_mfa-what-is-mfa', 'agrega mais segurança', 'AWS MFA (Autenticação Multi Fator) agrega mais segurança porque requer dos usuários fornecer autenticação exclusiva de um mecanismo de MFA com suporte da AWS, além das suas credenciais de login regular ao acessarem sites ou serviços da AWS.');
	linkhelp = linkhelp + getLinkHelp('Marketplace', 'https://aws.amazon.com/pt/mp/marketplace-service/overview/', 'catálogo digital de software pronto de terceiros', 'AWS Marketplace é um catálogo digital de software pronto de terceiros que facilita encontrar, testar, comprar e implantar e podem ser executados no AWS.');
	linkhelp = linkhelp + getLinkHelp('OpsWorks', 'https://aws.amazon.com/pt/opsworks/', 'gerenciamento de configurações de servidores via código', 'AWS OpsWorks é um serviço de gerenciamento de configurações de servidores via código que oferece instâncias gerenciadas do Chef e do Puppet. O Chef e o Puppet são plataformas de automação que permitem usar código para automatizar a configuração de servidores. Ele permite usar o Chef e o Puppet para automatizar a forma como os servidores são configurados, implantados e gerenciados em instâncias do Amazon EC2 ou ambientes de computação no local.');
	linkhelp = linkhelp + getLinkHelp('Support', 'https://docs.aws.amazon.com/pt_br/awssupport/latest/user/getting-started.html', 'cinco planos de suporte', 'O AWS Support oferece cinco planos de suporte:Basic,<br/>Desenvolvedor,<br/>Business,<br/>Enterprise On-Ramp,<br/>Enterprise,<br/>Todos os planos de suporte oferecem acesso 24 horas por dia, 7 dias por semana ao atendimento ao cliente, à documentação da AWS, aos whitepapers e aos fóruns de suporte.');
	linkhelp = linkhelp + getLinkHelp('Multi Regions', 'https://aws.amazon.com/pt/solutions/implementations/multi-region-application-architecture/', 'estratégia de DR', 'Multi Regions (Distribuir em regiões diferentes), é para estratégia de DR (Recuperação de Desastre). Os recursos de computação em nuvem da Amazon são hospedados em vários locais no mundo todo. Esses locais são compostos por regiões da AWS, zonas de disponibilidade e zonas locais. Cada região da AWS é uma área geográfica separada.');
	linkhelp = linkhelp + getLinkHelp('Multi-AZ', 'https://docs.aws.amazon.com/pt_br/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html', 'aumentar a disponibilidade', 'Multi-AZ é para aumentar a disponibilidade. Em uma implantação Multi-AZ, o Amazon RDS cria automaticamente uma instância de banco de dados (BD) primária e replica de forma síncrona os dados para uma instância em uma AZ diferente. Quando detecta uma falha, o Amazon RDS executa automaticamente o failover para uma instância secundária sem nenhuma intervenção manual.');
	linkhelp = linkhelp + getLinkHelp('Read Replicas', 'https://aws.amazon.com/pt/rds/features/read-replicas/', 'escalabilidade', 'Read Replicas (Cópias de Leitura do Amazon RDS) facilitam a escalabilidade de maneira elástica além dos limites de capacidade de uma única instância de DB para cargas de trabalho de banco de dados com uso intenso de leitura. Complementam as implantações Multi-AZ. Embora ambos os recursos mantenham uma segunda cópia dos dados, há diferenças entre os dois.');
	linkhelp = linkhelp + getLinkHelp('ELB', 'https://aws.amazon.com/pt/elasticloadbalancing/', 'distribui automaticamente o tráfego de aplicações de entrada', 'ELB (Elastic Load Balancer) distribui automaticamente o tráfego de aplicações de entrada entre vários destinos e dispositivos virtuais em uma ou mais Zonas de disponibilidade (AZs).');
	linkhelp = linkhelp + getLinkHelp('Clusters', 'https://docs.aws.amazon.com/pt_br/AmazonECS/latest/userguide/clusters.html', '', 'Um cluster do Amazon ECS é um agrupamento lógico de tarefas ou serviços.');
	linkhelp = linkhelp + getLinkHelp('EKS', 'https://aws.amazon.com/pt/eks/', 'executar e escalar aplicações do Kubernetes', 'Amazon EKS (Elastic Kubernetes Service) é um serviço de contêiner gerenciado para executar e escalar aplicações do Kubernetes na nuvem ou on-premises.');
	linkhelp = linkhelp + getLinkHelp('ECS', 'https://docs.aws.amazon.com/pt_br/AmazonECS/latest/developerguide/Welcome.html', 'serviço de gerenciamento de contêineres', 'Amazon ECS (Elastic Container Service) é um serviço de gerenciamento de contêineres altamente rápido e escalável. Você pode usá-lo para executar, interromper e gerenciar contêineres em um cluster.');
	linkhelp = linkhelp + getLinkHelp('Refatoração', 'https://aws.amazon.com/pt/getting-started/hands-on/break-monolith-app-microservices-ecs-docker-ec2/module-one/', '', 'A refatoração é uma forma disciplinada de reestruturar o código quando pequenas mudanças são feitas nele para melhorar o design. Ao usar o Refactor Spaces, os clientes se concentram na refatoração das suas aplicações, e não na criação e no gerenciamento da infraestrutura subjacente que torna a refatoração possível.');
	linkhelp = linkhelp + getLinkHelp('ECR', 'https://aws.amazon.com/pt/ecr/', 'registro de contêiner', 'Amazon ECR (Elastic Container Registry) é um registro de contêiner totalmente gerenciado que oferece hospedagem de alta performance para que você possa implantar imagens e artefatos de aplicações de forma confiável em qualquer lugar.');
	linkhelp = linkhelp + getLinkHelp('Fargate', 'https://docs.aws.amazon.com/pt_br/AmazonECS/latest/developerguide/AWS_Fargate.html', 'executar contêineres sem a necessidade de gerenciar servidores', 'Fargate é uma tecnologia que pode ser usada com o Amazon ECS para executar contêineres sem a necessidade de gerenciar servidores ou clusters de instâncias do Amazon EC2. Com o AWS Fargate, não é mais necessário provisionar, configurar nem dimensionar os clusters de máquinas virtuais para executar contêineres. Fargate elimina a necessidade de escolher tipos de servidor, decidir quando dimensionar clusters ou otimizar o agrupamento de clusters.');
	linkhelp = linkhelp + getLinkHelp('EventSync', 'https://docs.aws.amazon.com/pt_br/cognito/latest/developerguide/getting-started-with-cognito-sync.html', 'sincronização dos dados de usuários', 'O Amazon Cognito Sync é um serviço da AWS e uma biblioteca de clientes que permite a sincronização dos dados de usuários relacionados a aplicações entre dispositivos.');
	linkhelp = linkhelp + getLinkHelp('EventBridge', 'https://aws.amazon.com/pt/eventbridge/?nc2=h_ql_prod_ap_eb', 'barramento de eventos', 'O Amazon EventBridge é um barramento de eventos sem servidor que torna mais fácil a criação de aplicações orientadas por eventos em escala usando eventos gerados com base em suas aplicações, aplicações integradas de software como serviço (SaaS) e serviços da AWS.');
	linkhelp = linkhelp + getLinkHelp('Auto Scaling', 'https://aws.amazon.com/pt/ec2/autoscaling/', 'adicionar ou remover instâncias do EC2 automaticamente', 'O Amazon EC2 Auto Scaling ajuda a manter a disponibilidade das aplicações e permite adicionar ou remover instâncias do EC2 automaticamente de acordo com as condições que você definir (escalar baseado em demanda).');
	linkhelp = linkhelp + getLinkHelp('Route53', 'https://docs.aws.amazon.com/pt_br/Route53/latest/DeveloperGuide/Welcome.html', 'registro de domínios', 'O Amazon Route 53 é um web service de Domain Name System (DNS) altamente disponível e dimensionável. Você pode usar o Route 53 para executar três funções principais em qualquer combinação: registro de domínios, roteamento de DNS e verificação de integridade.');
	linkhelp = linkhelp + getLinkHelp('Dedicted Hosts', 'https://docs.aws.amazon.com/pt_br/AWSEC2/latest/UserGuide/dedicated-hosts-overview.html', 'servidor físico com capacidade de instância do EC2', 'AWS Dedicted Hosts é um Host Dedicado do Amazon EC2 é um servidor físico com capacidade de instância do EC2 totalmente dedicado para seu uso. Os hosts dedicados permitem que você use suas licenças de software existentes por soquete, por núcleo ou por VM, incluindo o Windows Server, o Microsoft SQL Server, o SUSE e o Linux Enterprise Server.');
	linkhelp = linkhelp + getLinkHelp('Budgets', 'https://docs.aws.amazon.com/pt_br/cost-management/latest/userguide/budgets-managing-costs.html', 'rastreamento de uso e custo da AWS', 'AWS Budgets é para rastreamento de uso e custo da AWS. Monitorar métricas agregadas de utilização e cobertura para suas Instâncias Reservadas (RIs) ou Savings Plans.');
	linkhelp = linkhelp + getLinkHelp('Budgets Destinatários por Email', 'https://docs.aws.amazon.com/pt_br/cost-management/latest/userguide/budgets-controls.html', 'pode ter até 10 endereços de e-mail', 'Em Notification preferences - Opional (Preferências de notificação - Opcional), em Email recipients (Destinatários de e-mail), insira os endereços de e-mail que você que o alerta notifique. Separe múltiplos endereços de e-mail com vírgulas. Uma notificação pode ter até 10 endereços de e-mail.');
	linkhelp = linkhelp + getLinkHelp('Inspector', 'https://aws.amazon.com/pt/inspector/', 'gerenciamento de vulnerabilidade que verifica continuamente', 'O Amazon Inspector é um serviço automatizado de gerenciamento de vulnerabilidade que verifica continuamente as workloads da AWS em busca de vulnerabilidades de software e exposição não intencional à rede.');
	linkhelp = linkhelp + getLinkHelp('Trusted Advisor', 'https://aws.amazon.com/pt/premiumsupport/technology/trusted-advisor/', 'avalia a sua conta por meio de verificações', 'Trusted Advisor avalia a sua conta por meio de verificações. Essas verificações identificam formas de otimizar sua infraestrutura da AWS, aumentar a segurança e o desempenho, reduzir os custos gerais e monitorar as cotas do serviço.<br/>Benefícios:<br/>Otimização de custos<br/>Performance<br/>Segurança<br/>Tolerância a falhas<br/>Cotas de serviço');
	linkhelp = linkhelp + getLinkHelp('IPV4', 'https://docs.aws.amazon.com/pt_br/AWSEC2/latest/UserGuide/using-instance-addressing.html', 'não é acessível pela Internet', 'Um endereço IPv4 privado é um endereço IP que não é acessível pela Internet. É possível usar endereços IPv4 privados para comunicação entre instâncias na mesma VPC.');
	linkhelp = linkhelp + getLinkHelp('IP Elástico', 'https://docs.aws.amazon.com/pt_br/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html', 'alocado para a conta da AWS e será seu até que você o libere', 'Um Endereço IP elástico é um endereço IPv4 estático projetado para computação em nuvem dinâmica. Um endereço IP elástico é alocado para a conta da AWS e será seu até que você o libere.');
	linkhelp = linkhelp + getLinkHelp('IPV6', 'https://docs.aws.amazon.com/pt_br/vpc/latest/userguide/vpc-migrate-ipv6.html', 'suporte ao IPv6', 'Se você possuir uma VPC existente que ofereça suporte somente para IPv4 e recursos na sub-rede que sejam configurados para usar somente o IPv4, você pode habilitar o suporte ao IPv6 para a VPC e recursos.');
	linkhelp = linkhelp + getLinkHelp('Elastic Cache', 'https://aws.amazon.com/pt/elasticache/', 'cache na memória', 'AWS Elastic Cache é um serviço de cache na memória totalmente gerenciado. Você pode usar para armazenamento em cache, o que acelera a performance de aplicações e bancos de dados, ou como um armazenamento de dados principal para casos de uso que não exigem durabilidade, como armazenamentos de sessões, placares de jogos, streaming e análises. Compatível com o Redis e o Memcached.');
	linkhelp = linkhelp + getLinkHelp('Redis', 'https://aws.amazon.com/pt/redis/', 'datastore de chave-valor', 'O Redis (Remote Dictionary Server) é um datastore de chave-valor rápido e de código aberto na memória e é usado como banco de dados, cache, agente de mensagens e fila. A AWS oferece dois serviços totalmente gerenciados para executar o Redis: Amazon MemoryDB for Redis e o  O Amazon ElastiCache for Redis.');
	linkhelp = linkhelp + getLinkHelp('Pricing', 'https://docs.aws.amazon.com/pt_br/pricing-calculator/latest/userguide/what-is-pricing-calculator.html', '', 'AWS Pricing Calculator é uma ferramenta de planejamento baseada na web que você pode usar para criar estimativas para os casos de uso AWS. Você pode usá-lo para modelar suas soluções antes de criá-las, planejar como você gasta.');
	linkhelp = linkhelp + getLinkHelp('IAAS', 'https://aws.amazon.com/pt/what-is-cloud-computing/?nc2=h_ql_le_int_cc', 'recursos de rede, computadores', 'IaaS (Infraestrutura como Serviço) contém os componentes básicos da IT na nuvem. Normalmente, o IaaS oferece acesso a recursos de rede, computadores (virtuais ou em hardware dedicado) e espaço de armazenamento de dados. O IaaS oferece o mais alto nível de flexibilidade e controle de gerenciamento sobre os recursos de infraestrutura de tecnologia.');
	linkhelp = linkhelp + getLinkHelp('SAAS', 'https://aws.amazon.com/pt/what-is-cloud-computing/?nc2=h_ql_le_int_cc', 'aplicativos de usuários finais', 'SaaS (Software como Serviço) O SaaS oferece um produto completo, executado e gerenciado pelo provedor de serviços. Na maioria dos casos, refere-se a aplicativos de usuários finais (como e-mail baseado na web). Com uma oferta de SaaS, você não precisa pensar sobre a manutenção do serviço ou o gerenciamento da infraestrutura subjacente. Você só precisa se preocupar sobre como utilizará esse software específico.');
	linkhelp = linkhelp + getLinkHelp('BAAS', 'https://aws.amazon.com/pt/what-is-cloud-computing/?nc2=h_ql_le_int_cc', 'automatiza o desenvolvimento do backend', 'BAAS (Backend As A Service) é um serviço que automatiza o desenvolvimento do backend, por meio da terceirização dessas funções. Pode ser classificado como um middleware, ou seja, um software que fornece serviços para outros aplicativos ou o próprio sistema. O backend é a estrutura que possibilita a operação do sistema.');
	linkhelp = linkhelp + getLinkHelp('PAAS', 'https://aws.amazon.com/pt/what-is-cloud-computing/?nc2=h_ql_le_int_cc', 'hardware e sistemas operacionais', 'PaaS (Plataforma como Serviço) você não precisa mais gerenciar a infraestrutura subjacente (geralmente, hardware e sistemas operacionais) e pode manter o foco na implantação e no gerenciamento de aplicativos.');
	linkhelp = linkhelp + getLinkHelp('Cognito', 'https://docs.aws.amazon.com/pt_br/cognito/latest/developerguide/what-is-amazon-cognito.html', 'cadastramento, login e controle de acesso', 'AWS Cognito permite adicionar cadastramento, login e controle de acesso de usuários a aplicações Web e móveis com rapidez e facilidade para vários dispositivos.');
	linkhelp = linkhelp + getLinkHelp('IAM', 'https://aws.amazon.com/pt/iam/', 'controle de acesso a serviços e recursos', 'AWS IAM (Identity and Access Management) fornece controle de acesso a serviços e recursos em determinada condição em toda a AWS. Com as políticas do IAM, você gerencia permissões para seu quadro de funcionários e sistemas para garantir permissões com privilégios mínimos.');
	linkhelp = linkhelp + getLinkHelp('IAM Policies', 'https://docs.aws.amazon.com/pt_br/IAM/latest/UserGuide/access_policies_examples.html', '', 'IAM Policies (Política), é um objeto na AWS que, quando associado a uma identidade ou um recurso, define suas permissões. A AWS avalia essas políticas quando uma entidade de segurança do IAM (usuário ou função) faz uma solicitação. As permissões nas políticas determinam se a solicitação será permitida ou negada.');
	linkhelp = linkhelp + getLinkHelp('IAM Groups', 'https://docs.aws.amazon.com/pt_br/IAM/latest/UserGuide/id_groups.html', '', 'IAM Groups (Grupo de Usuários do IAM) é um conjunto de usuários do IAM. Os grupos de usuários permitem especificar permissões para vários usuários, o que pode facilitar o gerenciamento das permissões para esses usuários. Por exemplo, você pode ter um grupo de usuários chamado Admins e oferecer a esse grupo de usuários os tipos de permissões de que os administradores normalmente precisam.');
	linkhelp = linkhelp + getLinkHelp('IAM Users', 'https://docs.aws.amazon.com/pt_br/IAM/latest/UserGuide/id_users.html', '', 'IAM Users (Usuário do AWS) é uma entidade que você cria na AWS para representar a pessoa ou a aplicação que o utilizará para interagir com a AWS. Um usuário na AWS consiste em um nome e credenciais.');
	linkhelp = linkhelp + getLinkHelp('IAM Roles', 'https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html', '', 'IAM Roles (Função do IAM) é uma identidade do IAM que você pode criar em sua conta que tem permissões específicas. Você pode usar funções para delegar acesso a usuários, aplicativos ou serviços que normalmente não têm acesso aos seus recursos da AWS. Por exemplo, você pode permitir que um aplicativo móvel use recursos da AWS.');
	linkhelp = linkhelp + getLinkHelp('CloudWatch', 'https://aws.amazon.com/pt/cloudwatch/faqs/', '', 'AWS CloudWatch, é um serviço de monitoramento para recursos em nuvem AWS e os aplicativos que você executa na AWS. Você pode usar para coletar e rastrear métricas, coletar e monitorar arquivos de log, e definir alarmes.');
	linkhelp = linkhelp + getLinkHelp('Macie', 'https://aws.amazon.com/pt/macie/', '', 'AWS Macie é um serviço de segurança e privacidade de dados totalmente gerenciado que usa machine learning e correspondência de padrões para descobrir e proteger seus dados confidenciais na AWS.');
	linkhelp = linkhelp + getLinkHelp('Glue', 'https://docs.aws.amazon.com/pt_br/glue/latest/dg/what-is-glue.html', '', 'O AWS Glue é um serviço de ETL (extração, transformação e carregamento) totalmente gerenciado pela AWS.');
	linkhelp = linkhelp + getLinkHelp('DataSync', 'https://aws.amazon.com/pt/datasync/', '', 'DataSync é um serviço online seguro que automatiza e acelera a movimentação de dados entre serviços de armazenamento on-premises e da AWS.');
	linkhelp = linkhelp + getLinkHelp('Segurança', 'https://aws.amazon.com/pt/architecture/well-architected/?achp_wa1&wa-lens-whitepapers.sort-by=item.additionalFields.sortDate&wa-lens-whitepapers.sort-order=desc', '', 'Segurança se concentra na proteção de informações e sistemas. Os principais tópicos incluem confidencialidade e integridade de dados, gerenciamento de permissões de usuário e estabelecimento de controles para detectar eventos de segurança.');
	linkhelp = linkhelp + getLinkHelp('Excelência Operacional', 'https://aws.amazon.com/pt/architecture/well-architected/?achp_wa1&wa-lens-whitepapers.sort-by=item.additionalFields.sortDate&wa-lens-whitepapers.sort-order=desc', '', 'Excelência Operacional se concentra na execução e monitoramento sistemas e na melhoria contínua de processos e procedimentos. Os principais tópicos incluem automação de alterações, reação a eventos e definição de padrões para gerenciar as operações diárias.');
	linkhelp = linkhelp + getLinkHelp('Performance Eficiente', 'https://aws.amazon.com/pt/architecture/well-architected/?achp_wa1&wa-lens-whitepapers.sort-by=item.additionalFields.sortDate&wa-lens-whitepapers.sort-order=desc', '', 'Performance Eficiente se concentra na alocação estruturada e simplificada de recursos de TI e computação. Os principais tópicos incluem seleção dos tipos e tamanhos certos dos recursos otimizados para os requisitos de workload, monitoramento de performance e manutenção da eficiência à medida que as necessidades comerciais evoluem.');
	linkhelp = linkhelp + getLinkHelp('Confiabilidade', 'https://aws.amazon.com/pt/architecture/well-architected/?achp_wa1&wa-lens-whitepapers.sort-by=item.additionalFields.sortDate&wa-lens-whitepapers.sort-order=desc', '', 'Confiabilidade se concentra nos workloads que executam as funções pretendidas e na recuperação rápida de falhas em atender demandas. Os principais tópicos incluem projeto de sistemas distribuídos, planejamento de recuperação e requisitos adaptação a mudanças.');
	linkhelp = linkhelp + getLinkHelp('EBS Snapshots', 'https://docs.aws.amazon.com/pt_br/AWSEC2/latest/UserGuide/EBSSnapshots.html', '', 'EBS Snapshots são backups incrementais, o que significa que somente os blocos no dispositivo que tiverem mudado depois do snapshot mais recente serão salvos. Isso minimiza o tempo necessário para criar o snapshot e economiza em custos de armazenamento ao não duplicar os dados.');
	linkhelp = linkhelp + getLinkHelp('EBS', 'https://aws.amazon.com/pt/ebs/', '', 'EBS (Amazon Elastic Block Store) é um serviço de armazenamento em blocos fácil de usar, escalável e de alta performance projetado para o Amazon Elastic Compute Cloud (Amazon EC2). É necessário associar um EBS a uma instância EC2 para garantir a persistência dos dados quando a instância é desligada.');
	linkhelp = linkhelp + getLinkHelp('Git', 'https://aws.amazon.com/pt/getting-started/hands-on/migrate-git-repository/', '', 'Repositório privado do Github.');
	linkhelp = linkhelp + getLinkHelp('Glacier Deep Arquive', 'https://aws.amazon.com/pt/s3/faqs/#Amazon_S3_Glacier_Deep_Archive', '', 'S3 Glacier Deep Arquive é uma classe de armazenamento do Amazon S3 que oferece armazenamento de objetos seguro e durável para retenção de longo prazo de dados acessados uma ou duas vezes por ano. oferece armazenamento de custo mais baixo na nuvem, a preços significativamente mais baixos do que armazenar e manter dados em bibliotecas de fitas magnéticas on-premises ou arquivar dados externamente.');
	linkhelp = linkhelp + getLinkHelp('CodeBuild, CodeCommit, CodeDeploy', 'https://aws.amazon.com/pt/blogs/aws-brasil/construindo-um-pipeline-de-ci-cd-aws-devsecops-de-ponta-a-ponta-com-ferramentas-de-codigo-aberto-sca-sast-e-dast/#:~:text=Servi%C3%A7os%20de%20CI%2FCD&text=AWS%20CodeDeploy%20%E2%80%93%20%C3%A9%20um%20servi%C3%A7o,AWS%20Lambda%20e%20servidores%20locais', '', 'Ordem dos serviços AWS em um pipeline de CI/CD é 1, 2, 3.<br/>1 - AWS CodeCommit – Um serviço totalmente gerenciado de controle de código-fonte que hospeda repositórios seguros baseados em Git.<br/>2 - AWS CodeBuild – Um serviço de integração contínua totalmente gerenciado que compila o código-fonte, executa testes e produz pacotes de software que estão prontos para implantação.<br/>3 - AWS CodeDeploy – é um serviço totalmente gerenciado de implantação que automatiza implantações de software em diversos serviços de computação como Amazon EC2, AWS Fargate, AWS Lambda e servidores locais.');
	linkhelp = linkhelp + getLinkHelp('CodeDeploy', 'https://aws.amazon.com/pt/codedeploy/', '', 'AWS CodeDeploy é um serviço totalmente gerenciado de implantação que automatiza implantações de software em diversos serviços de computação como Amazon EC2, AWS Fargate, AWS Lambda e servidores locais.');
	linkhelp = linkhelp + getLinkHelp('CodeBuild', 'https://aws.amazon.com/pt/codebuild/', '', 'AWS CodeBuild é um serviço de integração contínua totalmente gerenciado que compila o código-fonte, executa testes e produz pacotes de software que estão prontos para implantação.');
	linkhelp = linkhelp + getLinkHelp('CodeCommit', 'https://aws.amazon.com/pt/codecommit/', '', 'O AWS CodeCommit é um serviço de controle de origem gerenciado seguro e altamente dimensionável que hospeda repositórios privados do Git. Ele torna mais fácil para as equipes colaborarem com segurança no código com contribuições criptografadas em trânsito e em repouso.');
	linkhelp = linkhelp + getLinkHelp('API Gateway', 'https://aws.amazon.com/pt/api-gateway/', '', 'AWS API Gateway é um serviço gerenciado que permite que desenvolvedores criem, publiquem, mantenham, monitorem e protejam APIs em qualquer escala com facilidade.');
	linkhelp = linkhelp + getLinkHelp('Direct Connect', 'https://docs.aws.amazon.com/pt_br/directconnect/latest/UserGuide/Welcome.html', '', 'Direct Connect vincula sua rede interna a um local do AWS Direct Connect usando um cabo de fibra óptica Ethernet padrão. Uma extremidade do cabo é conectada ao roteador, e a outra é conectada a um roteador do AWS Direct Connect.');
	linkhelp = linkhelp + getLinkHelp('WorkSpaces', 'https://aws.amazon.com/pt/workspaces/#:~:text=O%20Amazon%20Workspaces%20%C3%A9%20um,partir%20de%20qualquer%20dispositivo%20compat%C3%ADvel', '', 'O Amazon Workspaces é um serviço de virtualização de desktop totalmente gerenciado para Windows e Linux que habilita o acesso a recursos a partir de qualquer dispositivo compatível.');
	linkhelp = linkhelp + getLinkHelp('CLI', 'https://aws.amazon.com/pt/cli/', '', 'CLI (AWS Command Line Interface) é uma ferramenta de código aberto que permite interagir com os serviços da AWS usando comandos no shell da linha de comando.');
	linkhelp = linkhelp + getLinkHelp('X-Ray', 'https://aws.amazon.com/pt/xray/', '', 'AWS X-Ray ajuda desenvolvedores a analisar e depurar aplicações distribuídas de produção, como as criadas usando uma arquitetura de microsserviços. Com o X-Ray, é possível entender a performance de aplicativos e de seus serviços subjacentes para identificar e solucionar problemas e erros de performance.');
	linkhelp = linkhelp + getLinkHelp('Certificate Manager', 'https://aws.amazon.com/pt/certificate-manager/#:~:text=O%20AWS%20Certificate%20Manager%20%C3%A9,e%20os%20recursos%20internos%20conectados', '', 'Certificate Manager é um serviço que permite provisionar, gerenciar e implantar facilmente certificados Secure Sockets Layer (SSL)/Transport Layer Security (TLS) para uso com os serviços da AWS e os recursos internos conectados.');
	linkhelp = linkhelp + getLinkHelp('Kinesis', 'https://aws.amazon.com/pt/kinesis/#:~:text=O%20Amazon%20Kinesis%20Data%20Streams,centenas%20de%20milhares%20de%20fontes', '', 'Amazon Kinesis Data Streams é um serviço escalável e durável de streaming de dados em tempo real capaz de capturar continuamente gigabytes de dados por segundo de centenas de milhares de fontes.');
	linkhelp = linkhelp + getLinkHelp('Batch', 'https://aws.amazon.com/pt/batch/?nc2=h_ql_prod_cp_ba', '', 'AWS Batch planeja, programa e executa suas cargas de trabalho de computação em lote em toda a linha de recursos e produtos de computação da AWS, como AWS Fargate, Amazon EC2 e instâncias spot.');
	linkhelp = linkhelp + getLinkHelp('Elastic Beanstalk', 'https://aws.amazon.com/pt/elasticbeanstalk/', '', 'AWS Elastic Beanstalk é um serviço de fácil utilização para implantação e escalabilidade de aplicações e serviços da web desenvolvidos com Java, .NET, PHP, Node.js, Python, Ruby, Go e Docker em servidores familiares como Apache, Nginx, Passenger e IIS.');
	linkhelp = linkhelp + getLinkHelp('Lifecycle', 'https://docs.aws.amazon.com/pt_br/AmazonS3/latest/userguide/object-lifecycle-mgmt.html', '', 'Lifecycle, uma configuração do S3 Lifecycle é um arquivo XML que consiste em um conjunto de regras com ações predefinidas que você deseja que o Amazon S3 execute em objetos durante sua vida útil.');
	linkhelp = linkhelp + getLinkHelp('CloudFormation', 'https://aws.amazon.com/pt/cloudformation/', '', 'Permite modelar, provisionar e gerenciar recursos da AWS e de terceiros ao tratar a infraestrutura como código.');
	linkhelp = linkhelp + getLinkHelp('Shared Responsability', 'https://aws.amazon.com/pt/compliance/shared-responsibility-model/#:~:text=Responsabilidade%20da%20AWS%3A%20%E2%80%9Cseguran%C3%A7a%20da,os%20Servi%C3%A7os%20de%20nuvem%20AWS', '', 'A AWS é responsável por proteger a infraestrutura que executa todos os serviços oferecidos na Nuvem AWS. Essa infraestrutura é composta por hardware, software, redes e instalações que executam os Serviços de nuvem AWS.');
	linkhelp = linkhelp + getLinkHelp('Tolerância a Falha', 'https://inf.unioeste.br/gia/index.php/2020/10/22/tolerancia-a-falhas-em-sistemas-distribuidos-e-suas-aplicacoes/', '', 'A tolerância a falhas é a propriedade que garante a correta e eficiente operação de um sistema apesar da ocorrência de falhas em qualquer um dos seus componentes, ou unidades.');
	linkhelp = linkhelp + getLinkHelp('IAC', 'https://aws.amazon.com/marketplace/solutions/devops/infrastructure-as-code?aws-marketplace-cards.sort-by=item.additionalFields.headline&aws-marketplace-cards.sort-order=desc&awsf.aws-marketplace-devops-store-use-cases=*all', '', 'AWS IAC (Infraestrutura como CódigoC) ajuda as organizações a atingir suas metas de automação e autoatendimento de DevOps, mantendo arquivos de declaração no controle de versão que definem seus ambientes de aplicativos.');
	linkhelp = linkhelp + getLinkHelp('CodePipeline', 'https://aws.amazon.com/pt/codepipeline/#:~:text=O%20AWS%20CodePipeline%20permite%20modelar,um%20aplicativo%20e%20suas%20depend%C3%AAncias', '', 'AWS CodePipeline é um serviço gerenciado de entrega contínua que ajuda a automatizar pipelines de liberação para oferecer atualizações rápidas e confiáveis de aplicativos e infraestruturas. O CodePipeline automatiza as fases de compilação, Nível e implantação do processo de liberação sempre que ocorre uma mudança no código, de acordo com o modelo de liberação que você definiu.');
	linkhelp = linkhelp + getLinkHelp('Step Functions', 'https://aws.amazon.com/step-functions/?c=ser&sec=srv&step-functions.sort-by=item.additionalFields.postDateTime&step-functions.sort-order=desc', '', 'Step Functions é um serviço de fluxo de trabalho visual com pouco código utilizado por desenvolvedores para criar aplicações distribuídas, automatizar processos de TI e negócios e criar pipelines de dados e machine learning usando produtos da AWS.');
	linkhelp = linkhelp + getLinkHelp('QuickSight', 'https://aws.amazon.com/pt/quicksight/', '', 'O Amazon QuickSight permite que todos em sua organização entendam seus dados por meio de perguntas em linguagem natural, do uso de painéis interativos ou procurando automaticamente padrões e discrepâncias com tecnologia de machine learning.');
	linkhelp = linkhelp + getLinkHelp('Instance Purchasing Options', 'https://docs.aws.amazon.com/pt_br/AWSEC2/latest/UserGuide/instance-purchasing-options.html', '', '<b>- On-demand (Instâncias sob demanda), paga somente pelo uso.<br/><b>- Savings Plans</b> é um modelo de preços flexíveis que oferece preços mais baixos em comparação com os preços sob demanda, em troca de um compromisso de uso específico por um período de 1 ou 3 anos)<br/><b>- Reserved Instances</b> (Instâncias reservadas), paga por um contrato pré-estabelecido.<br/><b>- Spot Instances</b> (Instâncias spot), paga pelo uso dos recursos não utilizados por outros modelos.<br/><b>- Dedicated Hosts</b> (Hosts dedicados).<br/><b>- Dedicated Instances</b> (Instâncias dedicadas).<br/><b>- Capacity Reservations</b> (Reservas de Capacidade).');
	linkhelp = linkhelp + getLinkHelp('On Premises', 'https://docs.aws.amazon.com/codedeploy/latest/userguide/instances-on-premises.html', '', 'On premises é a infraestrutura ou Data Center particular, privado, local de uma empresa.');
	linkhelp = linkhelp + getLinkHelp('CloudFront', 'https://docs.aws.amazon.com/pt_br/AmazonCloudFront/latest/DeveloperGuide/Introduction.html', '', 'O Amazon CloudFront é um serviço da web que acelera a distribuição do conteúdo estático e dinâmico da web, como arquivos .html, .css, .js e arquivos de imagem, para os usuários. O CloudFront distribui o conteúdo por meio de uma rede global de datacenters denominados pontos de presença.');
	linkhelp = linkhelp + getLinkHelp('TCO', 'https://docs.aws.amazon.com/whitepapers/latest/how-aws-pricing-works/aws-pricingtco-tools.html', '', 'TCO (Calculadora de Custo Total) ou (Total Cost of Ownership) é uma ferramenta para ajudar você a estimar os gastos dos serviços AWS reduzindo o custo total de propriedade (TCO), diminuindo a necessidade de investimento em grandes despesas de capital e oferecendo um modelo de pagamento conforme o uso. Exemplo: Se você for experimentar o (Amazon EC2), pode ser útil saber por quanto tempo pretende usar os <b><u>servidores</u></b>, o tipo de sistema operacional, quais são os requisitos de memória e quanta E/S precisa, decidir se precisa de armazenamento e se executará um banco de dados.');
	linkhelp = linkhelp + getLinkHelp('Console Manager', 'https://docs.aws.amazon.com/awsconsolehelpdocs/latest/gsg/learn-whats-new.html', '', 'AWS Management Console (Console de Gerenciamento da AWS) é um aplicativo da web que compreende e se refere a uma ampla coleção de consoles de serviço para gerenciar recursos da AWS.');
	linkhelp = linkhelp + getLinkHelp('Service Catalog', 'https://aws.amazon.com/pt/servicecatalog/?aws-service-catalog.sort-by=item.additionalFields.createdDate&aws-service-catalog.sort-order=desc', '', 'O AWS Service Catalog permite que empresas criem e gerenciem catálogos de serviços de TI que estejam aprovados para uso na AWS. Esses serviços de TI podem incluir tudo, de imagens de máquinas virtuais, servidores, software e bancos de dados a arquiteturas completas de aplicações multicamadas.');
	linkhelp = linkhelp + getLinkHelp('Infraestrutura Global', 'https://docs.aws.amazon.com/pt_br/whitepapers/latest/aws-overview/global-infrastructure.html', '', 'A AWS atende a mais de um milhão de clientes ativos em mais de 240 países e territórios. A Nuvem AWS opera 80 zonas de disponibilidade em 25 regiões geográficas ao redor do mundo, e há planos para adicionar mais zonas de disponibilidade e regiões.');
	linkhelp = linkhelp + getLinkHelp('', '', '', '');

	document.getElementById('divlinkhelp').innerHTML = linkhelp;

//	var DataShow_Config = window.open("config00.html?sim=00", "datashowconfig", "top=0, width=400, height=200, left=500, location=no, menubar=no, resizable=no, scrollbars=no, status=no, titlebar=no, toolbar=no");
}

function showCorrect(valorindice, myid, mygroup, mycode) {
	if (document.getElementById('chkMycorrect'+valorindice+'answer').checked == true) {
		document.getElementById('lblcorrect' + valorindice).style.display='block';
		document.getElementById('chkMycorrect'+valorindice+'answer').disabled = true;
	} else {
		document.getElementById('lblcorrect' + valorindice).style.display='none';
	}
	updateStudentPlay(myid, mygroup, mycode);
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
	$('#divbuttons').hide();
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
//	$('#divconfig').hide();
	$('#divGearAddNewLiryc').hide();
	$('#divFormSim').hide();
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
//	$('#divconfig').hide();
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
//	document.getElementById('btnPlay').style.display='none';
//	document.getElementById('btnAddNewManual').style.display='none';
//	document.getElementById('btnGear').style.display='none';
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
//https://jsstore.net/tutorial/get-started/