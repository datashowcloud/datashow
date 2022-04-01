

var jsstoreCon = new JsStore.Connection();

window.onload = function () {
	refreshTableData();
    registerEvents();
    initDb();
	showForm1Form2();
	$('#txtSearch').focus();
	$('#txtSearch').select();
	localStorage.setItem('valueArt', document.getElementById('selMycodeTextGroup').selectedIndex);
	localStorage.setItem('valueComplete', 'true');
	localStorage.setItem('valueVideoPlay', 'true');
	localStorage.setItem('valueLogoBig', 'true');
	localStorage.getItem('valueText', '');
	setCookie('valueText', '', '1');
};

async function initDb() {
    var isDbCreated = await jsstoreCon.initDb(getDbSchema());
    if (isDbCreated) {
        console.log('db created');
		document.getElementById('txtSearch').value = 'created';
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
			mycode: { notNull: true, dataType: 'string' }, //capítulo ou código único
			myorder: { notNull: true, dataType: 'string' }, //versículo ou ordem da estrofe
			mytext: { notNull: true, dataType: 'string' }, //um texto da letra
			mysearch: { notNull: false, dataType: 'string' }, //texto sem os caracteres especiais para fazer o search com maior precisão
			myversion: { notNull: false, dataType: 'string' }, //0=padrão erudita, 1=moderna
			mycodeTextGroup: { notNull: false, dataType: 'string' }, //0=bible, 1=lirics, 2=art
			myfix: { notNull: false, dataType: 'string' }, //fixa para sempre ser exibido no final do resultado da pesquisa ou apresentação
			myfavorite: { notNull: false, dataType: 'string' }, //indica texto favorito que pode ser filtrado na pesquisa
            mytype: { notNull: false, dataType: 'string' }, //r=refrão, nulo=texto normal
			mystatus: { notNull: false, dataType: 'string' }, //0=inativo, 1=ativo, 
			myfavorite: { notNull: false, dataType: 'string' }, //1=favorito, 0=não favorito
            mymodified: { notNull: false, dataType: 'string' }, //aaaammdd hhmmss, momento que o texto foi alterado
            mycreated: { notNull: false, dataType: 'string' }, //aaaammdd hhmmss, momento que o texto foi criado
            mytimer: { notNull: false, dataType: 'string' }, //cronômetro numérico em segundos para mudar o texto automaticamente, exemplo: 4s
            myrepeated: { notNull: false, dataType: 'string' }, //indica texto repetido na letra, onde 0=não=exibição obrigatória, >0=sim=exibição opcional, default = 1
            myowner: { notNull: false, dataType: 'string' }, //dono do texto ou responsável por inserir na tabela
			mycomment: { notNull: false, dataType: 'string' }, //comentário sobre a letra
            fontfamily: { notNull: false, dataType: 'string' },
            fontsize: { notNull: false, dataType: 'string' },
            color: { notNull: false, dataType: 'string' },
            textalign: { notNull: false, dataType: 'string' },
            backgroundcolor: { notNull: false, dataType: 'string' },
            camporeserva1: { notNull: false, dataType: 'string' },
            camporeserva2: { notNull: false, dataType: 'string' },
            camporeserva3: { notNull: false, dataType: 'string' }
        }
    }
	
	var tableBible = { //idêntico à Student
        name: 'Bible',
        columns: {
			id: { primaryKey: true, autoIncrement: true },
			mycode: { notNull: true, dataType: 'string' },
			myorder: { notNull: true, dataType: 'string' },
			mytext: { notNull: true, dataType: 'string' },
			mysearch: { notNull: false, dataType: 'string' },
			myversion: { notNull: false, dataType: 'string' },
			mycodeTextGroup: { notNull: false, dataType: 'string' },
			myfix: { notNull: false, dataType: 'string' },
			myfavorite: { notNull: false, dataType: 'string' },
            mytype: { notNull: false, dataType: 'string' },
			mystatus: { notNull: false, dataType: 'string' },
			myfavorite: { notNull: false, dataType: 'string' },
            mymodified: { notNull: false, dataType: 'string' },
            mycreated: { notNull: false, dataType: 'string' },
            mytimer: { notNull: false, dataType: 'string' },
            myrepeated: { notNull: false, dataType: 'string' },
            myowner: { notNull: false, dataType: 'string' },
			mycomment: { notNull: false, dataType: 'string' },
            fontfamily: { notNull: false, dataType: 'string' },
            fontsize: { notNull: false, dataType: 'string' },
            color: { notNull: false, dataType: 'string' },
            textalign: { notNull: false, dataType: 'string' },
            backgroundcolor: { notNull: false, dataType: 'string' },
            camporeserva1: { notNull: false, dataType: 'string' },
            camporeserva2: { notNull: false, dataType: 'string' },
            camporeserva3: { notNull: false, dataType: 'string' }
        }
    }

	var tableArt = { //idêntico à Student
        name: 'Art',
        columns: {
			id: { primaryKey: true, autoIncrement: true },
			mycode: { notNull: true, dataType: 'string' },
			myorder: { notNull: true, dataType: 'string' },
			mytext: { notNull: true, dataType: 'string' },
			mysearch: { notNull: false, dataType: 'string' },
			myversion: { notNull: false, dataType: 'string' },
			mycodeTextGroup: { notNull: false, dataType: 'string' },
			myfix: { notNull: false, dataType: 'string' },
			myfavorite: { notNull: false, dataType: 'string' },
            mytype: { notNull: false, dataType: 'string' },
			mystatus: { notNull: false, dataType: 'string' },
			myfavorite: { notNull: false, dataType: 'string' },
            mymodified: { notNull: false, dataType: 'string' },
            mycreated: { notNull: false, dataType: 'string' },
            mytimer: { notNull: false, dataType: 'string' },
            myrepeated: { notNull: false, dataType: 'string' },
            myowner: { notNull: false, dataType: 'string' },
			mycomment: { notNull: false, dataType: 'string' },
            fontfamily: { notNull: false, dataType: 'string' },
            fontsize: { notNull: false, dataType: 'string' },
            color: { notNull: false, dataType: 'string' },
            textalign: { notNull: false, dataType: 'string' },
            backgroundcolor: { notNull: false, dataType: 'string' },
            camporeserva1: { notNull: false, dataType: 'string' },
            camporeserva2: { notNull: false, dataType: 'string' },
            camporeserva3: { notNull: false, dataType: 'string' }
        }
    }

	var tableTypeData = {
        name: 'TypeData',
        columns: {
			id: { primaryKey: true, autoIncrement: true },
			code: { notNull: true, dataType: 'string' },
			description: { notNull: true, dataType: 'string' },
			status: { notNull: true, dataType: 'string' }
        }
    }

    var db = {
        name: 'mydb1',
        tables: [table, tableBible, tableArt, tableTypeData]
    }
    return db;
}

function registerEvents() {
    $('#btnSelectCountAll').click(function () {
		selectCountAll();
    })
	
    $('#txtSearch').keyup(function () {
		if (event.keyCode == 13 || event.which == 13) { //13=tecla ENTER
			refreshTableData();
			if (document.getElementById('txtSearch').value.length <= 1) { // pesquisa somente com mais de 1 caracter preenchido no campo search
				if (document.getElementById('selMycodeTextGroup').selectedIndex == '1') {
					showBible();
				}
			} else {
				showGridAndHideForms();
			}
//			freezeDataShow(true);
			$('#txtSearch').focus();
			$('#txtSearch').select();
		} else if (event.keyCode == 27 || event.which == 27) { //ESC
			$('#txtSearch').focus();
			$('#txtSearch').select();
		}
    })

    $('#btnSearch').click(function () {
		refreshTableData();
		if (document.getElementById('txtSearch').value.length <= 1) { // pesquisa somente com mais de 1 caracter preenchido no campo search
			if (document.getElementById('selMycodeTextGroup').selectedIndex == '1') {
				showBible();
			}
		} else {
			showGridAndHideForms();
		}
//		freezeDataShow(true);
		$('#txtSearch').focus();
		$('#txtSearch').select();
    })

    $('#selMycodeTextGroup').change(function () {
		var selectedIndex = document.getElementById('selMycodeTextGroup').selectedIndex;
		localStorage.setItem('valueArt', selectedIndex);
		freezeDataShow(true);
		if (document.getElementById('txtSearch').value.length <= 1) { // pesquisa somente com mais de 1 caracter preenchido no campo search
			if (selectedIndex == '1') {
				showBible();
			} else if (selectedIndex == '0' || selectedIndex == '2') {
				document.getElementById('txtSearch').value = 'favoritos iirf';
				refreshTableData();
				showGridAndHideForms();
			}
		} else {
			if (selectedIndex == '1') {
				document.getElementById('txtSearch').value = '';
				showBible();
			} else {
				refreshTableData();
				showGridAndHideForms();
			}
		}
		$('#txtSearch').focus();
		$('#txtSearch').select();
    })
    $('#btnDeleteLirics').click(function () {
		deleteLirycs();
    })
    $('#btnDeleteBible').click(function () {
		deleteBible();
    })
    $('#btnDeleteArt').click(function () {
		deleteArt();
    })
    $('#btnDropDb').click(function () {
		dropdb();
    })
    $('#btnImport').click(function () {
		document.getElementById('selMycodeTextGroup').selectedIndex = 0;
		openFile(dispFile);
    })
    $('#btnImportBible').click(function () {
		document.getElementById('selMycodeTextGroup').selectedIndex = 1;
		openFile(dispFile);
    })
    $('#btnImportArt').click(function () {
		document.getElementById('selMycodeTextGroup').selectedIndex = 2;
		openFile(dispFile);
    })
    $('#btnConfirmImport').click(function () {
		confirmImport();
    })
    $('#btnCancelImport').click(function () {
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
    })
    $('#tblGrid tbody').on('click', '.edit', function () {
		var row = $(this).parents().eq(1);
        var child = row.children();
		var id = row.attr('itemid');
		var mycode = child.eq(0).text();
		var myorder = child.eq(1).text();
		getFromTable(id, mycode, myorder);
		showFormAddUpdate();
    });
    $('#tblGrid tbody').on('click', '.delete', function () {
        var result = confirm('Are you sure, do you want to delete?');
        if (result) {
			var group = document.getElementById('selMycodeTextGroup').value;
            var studentId = $(this).parents().eq(1).attr('itemid');
            deleteStudent(Number(studentId), group);
        }
    });
    $('#btnSubmit').click(function () {
        var group = document.getElementById('selMycodeTextGroup').value;
		var studentId = $('form').attr('data-student-id');
        if (studentId) {
			updateStudent(group);
        } else {
            addStudent(group);
        }
    });
    $('#tblGrid tbody').on('click', '.freeze', function () {
		freezeDataShow(localStorage.getItem('valueAoVivo'));
    });
    $('#tblGrid tbody').on('click', '.logo', function () {
		showLogo();
    });
    $('#tblGrid tbody').on('click', '.complete', function () {
		searchComplete();
    });
    $('#tblGrid tbody').on('click', '.videoplaypause', function () {
		videoPlayPause();
    });
	$('#btnGear').click(function () {
		showFormGear();
    })
}

//This function select liryc
async function getFromTable(id, code, order) {
	var group = document.getElementById('selMycodeTextGroup').value;
	
	//select groupby mycode
	if (group == 1) { //bible
		var students = await jsstoreCon.select({
			from: 'Bible'
			  , where: { mycode: {like: '' + code + ''} 
					   , myorder: '' + order + ''
					   , id: {like: '' + id + ''} 
			  }
		});
	} else if (group == 2) { //art
		var students = await jsstoreCon.select({
			from: 'Art'
			  , where: { mycode: {like: '' + code + ''} 
					   , myorder: '' + order + ''
					   , id: {like: '' + id + ''} 
			  }
		});
	} else { //group == 0 e group == 3
		var students = await jsstoreCon.select({
			from: 'Student'
			  , where: { mycode: {like: '' + code + ''} 
					   , myorder: '' + order + ''
					   , id: {like: '' + id + ''} 
			  }
		});
	}

	students.forEach(function (student) {
		$('form').attr('data-student-id', student.id);
		$('#mycode').val(student.mycode);
		$('#myorder').val(student.myorder);
		$('#mytext').val(student.mytext);
		$('#mycodeTextGroup').val(student.mycodeTextGroup);
		$('#myrepeated').val(student.myrepeated);
		$('#myowner').val(student.myowner);
	})
}

//This function delete the table
async function deleteLirycs() {
    try {
        var result = confirm('delete all Lirycs?');
        if (result) {
			var noOfStudentRemoved = await jsstoreCon.remove({
				from: 'Student'
			});
			console.log(`${noOfStudentRemoved} students removed`);
			refreshTableData();
			alert('successfull');
		}
    } catch (ex) {
        alert(ex.message);
    }
}

//This function delete the table
async function deleteBible() {
    try {
        var result = confirm('delete all Bible?');
        if (result) {
			var noOfStudentRemoved = await jsstoreCon.remove({
				from: 'Bible'
			});
			console.log(`${noOfStudentRemoved} students removed`);
			refreshTableData();
			alert('successfull');
		}
    } catch (ex) {
        alert(ex.message);
    }
}

//This function delete the table
async function deleteArt() {
    try {
        var result = confirm('delete all Arts?');
        if (result) {
			var noOfStudentRemoved = await jsstoreCon.remove({
				from: 'Art'
			});
			console.log(`${noOfStudentRemoved} students removed`);
			refreshTableData();
			alert('successfull');
		}
    } catch (ex) {
        alert(ex.message);
    }
}

//This function drop database
async function dropdb() {
	var result = confirm('drop database?');
	if (result) {
		jsstoreCon.dropDb().then(function() {
			console.log('Db deleted successfully');
			refreshTableData();
			alert('successfull');
		}).catch(function(error) {
			console.log(error);
		});;
	}
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
		document.getElementById('btnLogoTop').innerHTML = 'Logo Pequeno';
		document.getElementById('btnLogoTop').classList.remove('btn-default');
		document.getElementById('btnLogoTop').classList.add('btn-success');
	} else if (localStorage.getItem('valueLogoBig') == 'false') {
		document.getElementById('btnLogoTop').innerHTML = '<i class="fa fa-times"></i> Logo Invisível';
		document.getElementById('btnLogoTop').classList.remove('btn-success');
		document.getElementById('btnLogoTop').classList.add('btn-default');
	} else if (localStorage.getItem('valueLogoBig') == '') {
		document.getElementById('btnLogoTop').innerHTML = '<i class=\"fa fa-plus\"></i> Logo Grande';
		document.getElementById('btnLogoTop').classList.remove('btn-success');
		document.getElementById('btnLogoTop').classList.add('btn-default');
	}
}

//This function freeze screen DataShow
async function freezeDataShow(aovivo) {
    try {
		if (aovivo == 'false') { //unfreeze DataShow
			localStorage.setItem('valueAoVivo', 'true');
			if (document.getElementById('btnFreezeTop') != null) {
				document.getElementById('btnFreezeTop').innerHTML = '<i class="fa fa-lock"></i> Congelar';
				document.getElementById('btnFreezeTop').classList.remove('btn-info');
				document.getElementById('btnFreezeTop').classList.add('btn-default');
			}
		} else { //freeze DataShow
			localStorage.setItem('valueAoVivo', 'false');
			if (document.getElementById('btnFreezeTop') != null) {
				document.getElementById('btnFreezeTop').innerHTML = '<i class="fa fa-times"></i> Descongelar';
				document.getElementById('btnFreezeTop').classList.remove('btn-default');
				document.getElementById('btnFreezeTop').classList.add('btn-info');
			}
		}
    } catch (ex) {
        alert(ex.message);
    }
}

//This function text repeated = myrepeated>0
async function searchComplete() {
    try {
		if (localStorage.getItem('valueComplete') == 'true') {
			localStorage.setItem('valueComplete', 'false');
			document.getElementById('btnCompleteTop').innerHTML = 'Letra Simples';
			refreshTableData();
//			document.getElementById('btnCompleteTop').classList.remove('btn-warning');
//			document.getElementById('btnCompleteTop').classList.add('btn-default');
		} else {
			localStorage.setItem('valueComplete', 'true');
			document.getElementById('btnCompleteTop').innerHTML = '<i class=\"fa fa-list\"></i> Letra Completa';
			refreshTableData();
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
			document.getElementById('btnVideoPlayTop').innerHTML = '<i class="fa fa-play"></i> Vídeo';
			document.getElementById('btnVideoPlayTop').classList.remove('btn-default');
			document.getElementById('btnVideoPlayTop').classList.add('btn-info');
//			localStorage.setItem('valueFullScreen', 'true');
		} else {
			localStorage.setItem('valueVideoPlay', 'true');
			document.cookie="valueVideoPlay=true; expires=Thu, 24 Jun 2050 12:00:00 GMT";
			document.getElementById('btnVideoPlayTop').innerHTML = '<i class=\"fa fa-pause\"></i> Vídeo';
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
//		document.getElementById('selMycodeTextGroup').value = '3';
		refreshTableData();
    } catch (ex) {
        alert(ex.message);
    }
}

//This function confirm import
async function confirmImport() {
	var result = confirm('Não feche esta janela. \nNão atualize esta janela. \n\nO DataShow está preparando a importação para você.');
	if (result) {
		try {
			valor = document.getElementById('contents').value;
			var nextpos = 0; var myorder = 0; var mycode = ''; var myrepeated = '0'; var contador = 0; var posicao = 0; repeated = 0;
			for (posicao=0; posicao<=valor.length; posicao++) {
				nextpos = valor.indexOf('\n\n', posicao); //próximo separador do texto correspondente a duas quebras de linhas juntas
				if (nextpos <= 0) {
					nextpos = valor.length; //força última gravação e encerra
				}
				if (valor.substring(posicao, posicao+3) == '<p>' || valor.substring(posicao, posicao+4) == '<br>' || valor.substring(posicao, posicao+4) == '<hr>') {
					posicao = posicao+4; //pula <p>\n
					mycode = removeSpecials(valor.substring(posicao, nextpos));
					myorder = 0;
					contador = parseInt(contador) + 1;
					console.log('Importar: \n' + mycode);
					document.getElementById('txtSearch').value = parseInt(contador) + ' importados';
				} else if (posicao == 0) { //primeiro registro sem separador <p>... executa somente 1 vez.
					mycode = removeSpecials(valor.substring(posicao, nextpos));
				}
//				repeated = valor.substring(posicao, nextpos).indexOf('<r>', 0); //próximo separador do texto correspondente a duas quebras de linhas juntas
//				alert(repeated);
//				if (repeated != 0) {
//					myrepeated = valor.substring(posicao+3, nextpos);
//				}
				
				var mytext = valor.substring(posicao, nextpos);
				var mycodeTextGroup = document.getElementById('selMycodeTextGroup').value;
				//alert('mycode='+mycode + ' myorder='+myorder + ' mycodeTextGroup='+mycodeTextGroup + ' myrepeated='+myrepeated + ' mytext='+mytext);
				setStudentFromImport(mycode, myorder, mytext, mycodeTextGroup, myrepeated);
				addStudentImport(contador, mycodeTextGroup);

				setTimeout(() => { refreshTableData() }, 500); // Executa novamente a cada 500 milisegundos
				
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
			alert('Aguarde uns 20 minutos, antes de fechar ou atualizar esta janela. \n\nO DataShow está organizando tudo para você... \n\nEquipe DataShow \nenio.francisco@gmail.com \n11 95239-2000 \n\nMédia de registros na primeira instalação: 32225=bíblia 10663=letras 19=imagem e vídeo');
		} catch (ex) {
			alert('erro \n\n\n' + ex.message + '\n\n\n' + mytext);
		}
	}
}

//This function refreshes the table
async function refreshTableData() {
    try {
		if (document.getElementById('txtSearch').value.length <= 1) { // pesquisa somente com mais de 1 caracter preenchido no campo search
			$('#tblGrid tbody').html('');
			return;
		}
		
		var group = document.getElementById('selMycodeTextGroup').value;
		var search = removeSpecials(document.getElementById('txtSearch').value);
		var complete = localStorage.getItem('valueComplete');
		
		//select groupby mycode
		if (group == 0) { //lirycs
			if (complete == 'true') { //letra completa
				var students = await jsstoreCon.select({
					from: 'Student'
				  , where: { mysearch: {like: '%' + search + '%'} 
						   , mycodeTextGroup: '' + group + ''
				  }
				  , groupBy: "mycode"
				});
			} else { //letra simples
				var students = await jsstoreCon.select({
					from: 'Student'
				  , where: { mysearch: {like: '%' + search + '%'} 
						   , mycodeTextGroup: '' + '0' + ''
						   , myrepeated: '0'
				  }
				  , groupBy: "mycode"
				});
			}
		} else if (group == 1) { //bible
			var students = await jsstoreCon.select({
				from: 'Bible'
			  , where: { mysearch: {like: '%' + search + '%'} 
					   , mycodeTextGroup: '' + group + ''
			  }
			  , groupBy: "mycode"
			});
		} else if (group == 2) { //arts
			var students = await jsstoreCon.select({
				from: 'Art'
			  , where: { mysearch: {like: '%' + search + '%'} 
					   , mycodeTextGroup: '' + group + ''
			  }
			  , groupBy: "mycode"
			});
		}
		
		var array = [];
		students.forEach(function (student) {
            var resultado = array.push(student.mycode);
        })
		for (i=0; i<=20; i++) {
			if (array[i] == undefined) {
				array[i] = '';
			}
		}
		
		//select where mycode
		if (group == 0) { //lirycs
			if (complete == 'true') { //letra completa
				var students = await jsstoreCon.select({
					from: 'Student'
					, where: {
						mycode:{in:[ 
							array[0], array[1], array[2], array[3], array[4],
							array[5], array[6], array[7], array[8], array[9],
							array[10], array[11], array[12], array[13], array[14],
							array[15], array[16], array[17], array[18], array[19],
							array[20]
						]}
						, mycodeTextGroup: '' + group + ''
					}
					, order: [{
						by: 'mycode',
					}, {
						by: 'myorder'
					}]
				});
			} else { //letra simples
				var students = await jsstoreCon.select({
					from: 'Student'
					, where: {
						mycode:{in:[ 
							array[0], array[1], array[2], array[3], array[4],
							array[5], array[6], array[7], array[8], array[9],
							array[10], array[11], array[12], array[13], array[14],
							array[15], array[16], array[17], array[18], array[19],
							array[20]
						]}
						, mycodeTextGroup: '' + group + ''
						, mycodeTextGroup: '' + '0' + ''
						, myrepeated: '0'
					}
					, order: [{
						by: 'mycode',
					}, {
						by: 'myorder'
					}]
				});
			}
		} else if (group == 1) { //bible
			var students = await jsstoreCon.select({
				from: 'Bible'
				, where: {
					mycode:{in:[ 
						array[0], array[1], array[2], array[3], array[4],
						array[5], array[6], array[7], array[8], array[9],
						array[10], array[11], array[12], array[13], array[14],
						array[15], array[16], array[17], array[18], array[19],
						array[20]
					]}
					, mycodeTextGroup: '' + group + ''
				}
				, order: [{
					by: 'mycode',
				}, {
					by: 'myorder'
				}]
			});
		} else if (group == 2) { //arts
			var students = await jsstoreCon.select({
				from: 'Art'
				, where: {
					mycode:{in:[ 
						array[0], array[1], array[2], array[3], array[4],
						array[5], array[6], array[7], array[8], array[9],
						array[10], array[11], array[12], array[13], array[14],
						array[15], array[16], array[17], array[18], array[19],
						array[20]
					]}
					, mycodeTextGroup: '' + group + ''
				}
				, order: [{
					by: 'mycode',
				}, {
					by: 'myorder'
				}]
			});
		}

        var htmlString = "";
        var varTdTh = '';
		var varOff = '';
		var varFav = '';
		var varEdit = '';
		var varDel = '';
		students.forEach(function (student) {
            if (student.myorder == '000') {
				htmlString += "<tr><td></td><td></td>"
				htmlString += "<td>"

				if (localStorage.getItem('valueLogoBig') == 'true') {
					htmlString += "<a href='#' class='logo'><button id=\"btnLogoTop\" class=\"btn btn-success\">Logo Pequeno</button></a>"
				} else if (localStorage.getItem('valueLogoBig') == 'false') {
					htmlString += "<a href='#' class='logo'><button id=\"btnLogoTop\" class=\"btn btn-success\"><i class=\"fa fa-times\"></i> Logo Invisível</button></a>"
				} else if (localStorage.getItem('valueLogoBig') == '') {
					htmlString += "<a href='#' class='logo'><button id=\"btnLogoTop\" class=\"btn btn-success\"><i class=\"fa fa-plus\"></i> Logo Grande</button></a>"
				}

				if (localStorage.getItem('valueAoVivo') == 'true') {
					htmlString += "&nbsp;<a href='#' class='freeze'><button id=\"btnFreezeTop\" class=\"btn btn-info\"><i class=\"fa fa-lock\"></i> Congelar</button></a>"
				} else {
					htmlString += "&nbsp;<a href='#' class='freeze'><button id=\"btnFreezeTop\" class=\"btn btn-info\"><i class=\"fa fa-times\"></i> Descongelar</button></a>"
				}

				if (localStorage.getItem('valueComplete') == 'true') {
					htmlString += "&nbsp;<a href='#' class='complete'><button id=\"btnCompleteTop\" class=\"btn btn-default\">Letra Simples</button></a>"
				} else {
					htmlString += "&nbsp;<a href='#' class='complete'><button id=\"btnCompleteTop\" class=\"btn btn-warning\"><i class=\"fa fa-list\"></i> Letra Completa</button></a>"
				}

				if (localStorage.getItem('valueVideoPlay') == 'true') {
					htmlString += "&nbsp;<a href='#' class='videoplaypause'><button id=\"btnVideoPlayTop\" class=\"btn btn-default\"><i class=\"fa fa-pause\"></i> Vídeo</button></a>"
				} else {
					htmlString += "&nbsp;<a href='#' class='videoplaypause'><button id=\"btnVideoPlayTop\" class=\"btn btn-primary\"><i class=\"fa fa-play\"></i> Vídeo</button></a>"
				}

				htmlString += "</td>"
				htmlString += "<td></td><td></td><td></td><td></td>"
				htmlString += "</tr>"
				varTdTh = 'th';
				varOff = "<i class=\"fa fa-stop\" style=\"color:#000000;\"></i>";
				varFav = "<td> <!--i class=\"fa fa-heart\" style=\"color:#3333AA;\"></i --> </td>";
				varEdit = "<td> <i class=\"fa fa-edit\" style=\"color:blue;\"></i> </td>";
				varDel = "<td> <i class=\"fa fa-times\" style=\"color:red;\"></i> </td>";
			} else {
				varTdTh = 'td';
				varOff = "<a href='#' class='favorite' style=\"color:#000000;\">Off</a>";
				varFav = "<td><a href='#' class='favorite' style=\"color:blue;\"> </a></td>";
				varEdit = "<td><a href='#' class='edit' style=\"color:blue;\">Edit</a></td>";
                varDel = "<td><a href='#' class='delete' style=\"color:#777777;\">Del</a></td>";
			}
			
			var mytext = student.mytext;
			var txtsearch = removeSpecials(document.getElementById('txtSearch').value);
			var auxiliar = removeSpecials(mytext);
			var posIni = auxiliar.toLowerCase().indexOf(txtsearch.toLowerCase(), 0);
			var mytextBold = '';
			
			if (posIni >= 0) {

				var diff = parseInt(mytext.substring(0, posIni+txtsearch.length).length) - parseInt(removeSpecials(mytext.substring(0, posIni+txtsearch.length)).length);
				
				posIni = posIni + parseInt(diff);

				mytextBold = mytext.substring(0, posIni)
				+ '<b style="background-color:#FFD700; color:green;">'
				+ mytext.substring(posIni, posIni+txtsearch.length)
				+ '</b>'
				+ mytext.substring(posIni+txtsearch.length);
			} else {
				mytextBold = mytext;
			}
			
			htmlString += "<tr ItemId=" + student.id + ">"
                + "<td style=\"color:white; font-size:1px;\">" + student.mycode + "</td>"
                + "<td style=\"color:black; font-size:8px;\">" + student.myorder + "</td>"
				+ "<" + varTdTh + " id=datashow" + student.id+"1" + " tabIndex=" + student.id+"1" + " onClick=\"datashow('" + student.id+"1" + "', 1, '" + student.mycode + "');\" onkeyup=\"moveCursor('" + student.mycode + "', 1, event, " + "" + (student.id+"1") + ");\" data-show='" + student.id+"1" + "'>" + mytextBold + "</" + varTdTh + ">"
				//+ "<td>" + student.mysearch + "</td>"
				+ "<td id=datashow" + (student.id+"2") + " tabIndex=" + (student.id+"2") + " onClick=\"datashow('" + (student.id+"2") + "', 1, '" + student.mycode + "');\" onkeyup=\"moveCursor('" + student.mycode + "', 1, event, " + "" + (student.id+"2") + ");\" data-show='" + (student.id+"2") + "'>" 
				+ varOff + " </td>"
//				+ "<td id=datashow" + (student.id+"3") + " tabIndex=" + (student.id+"3") + " onClick=\"datashow('" + (student.id+"3") + "', 1, '" + student.mycode + "');\" onkeyup=\"moveCursor('" + student.mycode + "', 1, event, " + "" + (student.id+"3") + ");\" data-show='" + (student.id+"3") + "'> </td>"
				+ varFav
				+ varEdit
                + varDel;
		})
		if (htmlString.length > 0) {
			htmlString += "</tr>"
		} else {
			htmlString += "<br><br><br><br><font color=blue>Não Encontrado <br><br>Pesquise Novamente </font>"
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

async function addStudentImport(contador, group) {
    var student = getStudentFromForm();
    try {
        if (group == '0') { //liryc
			var noOfDataInserted = await jsstoreCon.insert({
				into: 'Student',
				values: [student]
			});
		} else if (group == '1') { //bible
			var noOfDataInserted = await jsstoreCon.insert({
				into: 'Bible',
				values: [student]
			});
		} else if (group == '2') { //art
			var noOfDataInserted = await jsstoreCon.insert({
				into: 'Art',
				values: [student]
			});
		}
		if (noOfDataInserted === 1) {
			refreshTableData();
			if (document.getElementById('txtSearch').value.length <= 1) { // pesquisa somente com mais de 1 caracter preenchido no campo search
				if (document.getElementById('selMycodeTextGroup').selectedIndex == '1') {
					showBible();
				}
			} else {
				showGridAndHideForms();
			}
//			showGridAndHideForms();
		}
    } catch (ex) {
        alert(ex.message + ' error ' + student.text);
    }
}

async function addStudent(group) {
    var student = getStudentFromForm();
    try {
//        if (group == '0' || group == '3') { //liryc
        if (group == '0') { //liryc
			var noOfDataInserted = await jsstoreCon.insert({
				into: 'Student',
				values: [student]
			});
		} else if (group == '1') { //bible
			var noOfDataInserted = await jsstoreCon.insert({
				into: 'Bible',
				values: [student]
			});
		} else if (group == '2') { //art
			var noOfDataInserted = await jsstoreCon.insert({
				into: 'Art',
				values: [student]
			});
		}
        if (noOfDataInserted === 1) {
            refreshTableData();
			if (document.getElementById('txtSearch').value.length <= 1) { // pesquisa somente com mais de 1 caracter preenchido no campo search
				if (document.getElementById('selMycodeTextGroup').selectedIndex == '1') {
					showBible();
				}
			} else {
				showGridAndHideForms();
			}
//          showGridAndHideForms();
        }
    } catch (ex) {
        alert(ex.message);
    }
}

async function updateStudent(group) {
    var student = getStudentFromForm();
	try {
//        if (group == '0' || group == '3') { //smente letras, letra simples
        if (group == '0') { //somente letras
			var noOfDataUpdated = await jsstoreCon.update({
				in: 'Student',
				set: {
					mycode: student.mycode,
					myorder: student.myorder,
					mytext: student.mytext,
					mysearch: student.mysearch,
					myrepeated: student.myrepeated,
					myowner: student.myowner
				},
				where: {
					id: student.id
				}
			});
		} else if (group == '1') { //bible
			var noOfDataUpdated = await jsstoreCon.update({
				in: 'Bible',
				set: {
					mycode: student.mycode,
					myorder: student.myorder,
					mytext: student.mytext,
					mysearch: student.mysearch,
					myrepeated: student.myrepeated,
					myowner: student.myowner
				},
				where: {
					id: student.id
				}
			});
		} else if (group == '2') { //art
			var noOfDataUpdated = await jsstoreCon.update({
				in: 'Art',
				set: {
					mycode: student.mycode,
					myorder: student.myorder,
					mytext: student.mytext,
					mysearch: student.mysearch,
					myrepeated: student.myrepeated,
					myowner: student.myowner
				},
				where: {
					id: student.id
				}
			});
		}
        console.log(`data updated ${noOfDataUpdated}`);
        showGridAndHideForms();
        $('form').attr('data-student-id', null);
        refreshTableData();
        refreshFormData({});
    } catch (ex) {
        alert(ex.message);
    }
}

async function deleteStudent(id, group) {
    try {
        if (group == '0') { //liryc
			var noOfStudentRemoved = await jsstoreCon.remove({
				from: 'Student',
				where: {
					id: id
				}
			});
		} else if (group == '1') { //bible
			var noOfStudentRemoved = await jsstoreCon.remove({
				from: 'Bible',
				where: {
					id: id
				}
			});
		} else if (group == '2') { //art
			var noOfStudentRemoved = await jsstoreCon.remove({
				from: 'Art',
				where: {
					id: id
				}
			});
		}
        console.log(`${noOfStudentRemoved} students removed`);
        refreshTableData();
    } catch (ex) {
        alert(ex.message);
    }
}

function getStudentFromForm() {
	var myorderFormated = '';
	myorderFormated = '000' + $('#myorder').val();
	myorderFormated = myorderFormated.substring(myorderFormated.length-3, myorderFormated.length);
	var student = {
        id: Number($('form').attr('data-student-id')),
        mycode: $('#mycode').val(),
		myorder: myorderFormated,
        mytext: $('#mytext').val(),
        mysearch: removeSpecials($('#mytext').val()),
        mycodeTextGroup: $('#selMycodeTextGroup').val(),
        myrepeated: $('#myrepeated').val()
    };
    return student;
}

function setStudentFromImport(mycode, myorder, mytext, mycodeTextGroup, myrepeated) {
	document.getElementById('mycode').value = mycode;
	document.getElementById('myorder').value = myorder;
	if (mytext == '') {
		document.getElementById('mytext').value = ' ';
	} else {
		document.getElementById('mytext').value = mytext;
	}
	document.getElementById('selMycodeTextGroup').selectedIndex = mycodeTextGroup;
	document.getElementById('myrepeated').selectedIndex = myrepeated;
	document.getElementById('myowner').value = 'IIRF'; //HOPE
    $('#formAddUpdate').show();
}

function showFormAddUpdate() {
    $('#tblGrid').hide();
    $('#formAddUpdate').show();
	$('#divGear').hide();
	$('#divcontent').hide();
	$('#formBible').hide();
}

function showGridAndHideForms() {
    $('#tblGrid').show();
    $('#formAddUpdate').hide();
	$('#divGear').hide();
	$('#divcontent').hide();
	$('#formBible').hide();
}

function showFormImport() {
    $('#tblGrid').hide();
    $('#formAddUpdate').hide();
	$('#divGear').hide();
	$('#divcontent').show();
	$('#formBible').hide();
}

function showFormGear() {
    $('#tblGrid').hide();
    $('#formAddUpdate').hide();
	$('#divGear').show();
	$('#divcontent').hide();
	$('#formBible').hide();
}

function showBible() {
    $('#tblGrid').hide();
    $('#formAddUpdate').hide();
	$('#divGear').hide();
	$('#divcontent').hide();
	$('#formBible').show();
}

function showForm1Form2() {
	openLogo('logo/logo.png');
	openImagemFundo('gallery/_fundo01.mp4');
	var DataShow_Tela1 = window.open("datashowtela1.html", "datashowtela1", "top=0, width=350, height=260, left=1200, location=no, menubar=no, resizable=no, scrollbars=no, status=no, titlebar=no, toolbar=no");
	var DataShow_Tela2 = window.open("datashowtela2.html", "datashowtela2", "top=0, width=600, height=500, left=0, location=no, menubar=no, resizable=no, scrollbars=no, status=no, titlebar=no, toolbar=no");
}

function openLogo(logo) {
	localStorage.setItem('valueLogo', logo);
}

function openImagemFundo(filename) {
	extensao = filename.toLowerCase().substring((filename.length-3), filename.length);
	localStorage.setItem('valueVideoFundo', filename);
	localStorage.setItem('valueImagemFundo', filename);
}

function refreshFormData(student) {
    $('form').attr('data-student-id', student.id);
    $('#mycode').val(student.mycode);
    $('#myorder').val(student.myorder);
    $('#mytext').val(student.mytext);
    $('#mysearch').val(student.mysearch);
    $('#myrepeated').val(student.myrepeated);
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

function clickElem(elem) {
	var eventMouse = document.createEvent("MouseEvents")
	eventMouse.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
	elem.dispatchEvent(eventMouse)
}
function openFile(func) {
	readFile = function(e) {
		var file = e.target.files[0];
		//alert(file.name);
		if (!file) {
			document.getElementById('divcontent').style.display='none';
			return;
		}
		showFormImport();
		document.getElementById('divcontent').style.display='block';
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
	if (evento.keyCode == 13 || event.which == 13) {
		freezeDataShow('false');
		document.getElementById('txtSearch').value = removeSpecials(index.trim());
		refreshTableData();
    } else if (evento.keyCode == 27 || event.which == 27) { //ESC
		$('#txtSearch').focus();
		$('#txtSearch').select();
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
		} else if (evento.keyCode == 37 || event.which == 37) { //seta para esquerda
			nextTabIndex = parseInt(index) - parseInt(1);
		}
		datashow(nextTabIndex, col, mycode);
	}
}

function removeEspecialsCommands(valueText) {
	if (valueText.substring(0, 1) == '#' 
	 || valueText.substring(0, 3).toLowerCase() == 'off'
	 || valueText.substring(0, 3).toLowerCase() == 'del'
	 || valueText.substring(0, 4).toLowerCase() == 'edit') { //comando # no campo Search não precisa ser exibido
		valueText = '';
	} else {
		valueText = valueText.replaceAll('<b style="background-color:#FFD700; color:green;">', '');
		valueText = valueText.replaceAll('<a href="#" class="favorite" style=\"color:#000000;\">Off</a>', '');
		valueText = valueText.replaceAll('<i class=\"fa fa-stop\" style=\"color:#000000;\"></i>', '');
		valueText = valueText.replaceAll('</b>', '');
		valueText = valueText.replaceAll('&amp;', '&');
		
		valueText = valueText.replaceAll('<b>', '');
		valueText = valueText.replaceAll('<', ''); //garante que não há comandos no texto
	}
	return valueText;
}

//https://www.ti-enxame.com/pt/jquery/use-setas-para-navegar-em-uma-tabela-html/1046534083/
function datashow(index, col, code) {
	if (document.getElementById('datashow' + index) == null) { //não permite mover o foco para fora da tabela
		return;
	}
	document.getElementById('datashow' + index).focus;

	var valueText = removeEspecialsCommands(document.getElementById('datashow' + index).innerHTML);
	localStorage.setItem('valueText', valueText);
	setCookie('valueText', valueText, '1');

	//Com o click, seleciona apenas uma letra da lista de pesquida
	if (document.getElementById('txtSearch').value != removeSpecials(code.trim())) {
		document.getElementById('txtSearch').value = removeSpecials(code.trim());
		refreshTableData();
	} else {
		localStorage.setItem('valueLogoBig', 'true');
		showLogo();
	}

	localStorage.setItem('valueAutor', ' ');

	if (localStorage.getItem('valueArt') == '2') {
		localStorage.setItem('valueVideoFundo', localStorage.getItem('valueText'));
		setCookie('valueVideoFundo', localStorage.getItem('valueText'), '1');
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
	var nextcell = document.getElementById('datashow' + nextTabIndex);
	nextcell.focus();
	nextcell.style.backgroundColor = '#5cb85c';
	nextcell.style.color = 'white';
//	console.log('startElement=' + startElement + ', nextCol=' + nextCol + ', nextTabIndex=' + nextTabIndex + ', indexAutor=' + indexAutor);
}

function chooseBook(content) {
	document.getElementById('txtSearch').value = content;
}

function chooseChapter(content) {
	if (document.getElementById('txtSearch').value.length = 2) {
		var sizeSearch = document.getElementById('txtSearch').value.length;
		document.getElementById('txtSearch').value = document.getElementById('txtSearch').value.substring(0, sizeSearch) + content;
		refreshTableData();
		if (document.getElementById('txtSearch').value.length <= 1) { // pesquisa somente com mais de 1 caracter preenchido no campo search
			if (document.getElementById('selMycodeTextGroup').selectedIndex == '1') {
				showBible();
			}
		} else {
			showGridAndHideForms();
		}
//		showGridAndHideForms();
//		freezeDataShow(true);
		$('#txtSearch').focus();
		$('#txtSearch').select();	
	}
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
