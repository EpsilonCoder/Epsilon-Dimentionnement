
let nombreCharge;

	$('#entree').submit(function(e){
			e.preventDefault();			// to avoid reloading the page..
			nombreCharge = $('#charge').val();
			afficheLesChamps(nombreCharge);
	});
	
	function afficheLesChamps(nombreCharge){
				
				
			let buttonEnergie = $('#valeur_energie'), buttonPuiss = $('#puissance_totale');
				buttonEnergie.siblings().remove();
				buttonPuiss.siblings().remove();
				$('h3').siblings().remove();
				$('#message').children().remove();
				$('#alternative').val(0); 
	
			for(let i=1; i<=nombreCharge; i++)
			{
				$('#designation').append('<select id="d'+i+'">'+
				'<option>Aspirateur</option><option>Climatiseur</option>'+
				'<option>Chargeur de GSM</option><option>Console de jeux</option>'+
				'<option>Caf&eacuteti&egrave;re</option><option>Chauffage d\'appoint</option>'+
				'<option>D&eacute;codeur</option>'+
				'<option>Eclairage</option><option>Fer &agrave; repasser</option>'+
				'<option>Four &agrave; micro-ondes</option><option>Four &eacute;lectrique</option><option>Frigo</option>'+
				'<option>Hotte</option><option>Lave-vaisselle</option><option>Lampe</option><option>Lave-linge</option>'+
				'<option>Ordinateur</option>'+
				'<option>Rasoir &eacute;lectrique</option><option>Radio</option>'+
				'<option>S&eacute;choir</option><option>S&egrave;che-cheveux</option>'+
				'<option>T&eacute;l&eacute;viseur</option><option>TV LCD</option><option>TV LED</option>'+
				'<option>Ventilateur</option>'+
				'</select>');
				$('select').attr('style', 'width: 90px; height: 28px;');
				
				$('#qte').append('<input type="number" value="0" id="q'+i+'" min="0" />');
				
				$('#puissanceU').append('<input type="text" value="0" id="pu'+i+'" />');
				
				$('#tempsFonction').append('<input type="number" value="0" id="tf'+i+'" min="0" />');
				
				$('#puissanceT').append('<input type="text" value="0" id="pt'+i+'" disabled />');
				
				$('#energie').append('<input type="text" value="0" id="e'+i+'" disabled />');
			}
		
	
		
		$('#puissance_totale').click(function(){
			let pu, qte, ptotale;
			
			for(let j=1; j<=nombreCharge; j++)
			{	
				pu = $("#pu"+j+"").val();
				qte = $("#q"+j+"").val();
					if(isNaN(parseFloat(pu))) 
					{
						$("#pu"+j+"").attr('style', 'border-color: rgba(191, 68, 68, 0.75)');
						alert('Veuillez Remplir correctement la Puissance Unitaire !');
					
						$("#pu"+j+"").onmouseover(function(){	
								
								$(this).toggleClass('incorrect');
								
						}).focus(function(){
								$(this).css('border-color', 'rgba(191, 68, 68, 0.75)');
						}); 
						
					}else if( qte<0 || isNaN(qte)){	
					
						$("#q"+j+"").attr('style', 'border-color: rgba(191, 68, 68, 0.75)');
						alert('Veuillez Preciser la quanTiTe !');
					
						$("#q"+j+"").onmouseover(function(){			
							$(this).toggleClass('incorrect');
								
						}).focus(function(){
								$(this).css('border-color', 'rgba(191, 68, 68, 0.75)');
						});
						
					}else{
						ptotale = parseFloat(pu)*qte;
						$("#pt"+j+"").val(ptotale); 
						$("#pu"+j).removeAttr('style');
						$("#q"+j).removeAttr('style');
					}
			}
		});
		
		$('#valeur_energie').click(function(){
			let pt, temps, energie;
			
			for(let k=1; k<=nombreCharge; k++)
			{
				pt = $("#pt"+k+"").val();
				temps = $("#tf"+k+"").val();
				
				if( temps<0 || isNaN(temps))
				{
						$("#tf"+k+"").toggleClass('incorrect');
						alert('Le Temps ne peut etre NeGaTiF !');
					
						$("#tf"+k+"").onmouseover(function(){			
								$(this).attr('style', 'border-color: rgba(191, 68, 68, 0.75)');
								
						});
				}else{
						$("#tf"+k+"").removeAttr('style');
						energie = parseFloat(pt)*temps;
						$("#e"+k+"").val(energie);
						
					}
			}
		});
		
		$('#chargeTotale').click(function(){
			let totalEnergie=0, somme=0;
					// display the sum of the energy values..
			for(let l=1; l<=nombreCharge; l++)
			{
				totalEnergie += parseFloat($("#e"+l).val());
				somme += parseFloat($("#q"+l).val());
			}

			$('#message').children().remove();
			$('#message').append('<span>Pour '+(somme>1?'les ':'') +somme+' appareil'+(somme>1?'s':'')+', l\'&eacute;nergie totale &agrave; prevoir en KWh est de:</span>');
			$("#alternative").val(totalEnergie);
		});
		
		$('#annuler').click(function(){
			// reset the app and the mervelous slideUp() show..
			let buttonEnergie = $('#valeur_energie'), buttonPuiss = $('#puissance_totale');
				buttonEnergie.siblings().remove();
				buttonPuiss.siblings().remove();
				$('h3').siblings().remove();
				$('#charge').val(0);
				$('#alternative').val(0);
				$('#message').children().slideUp();
				nombreCharge = 0;
		});
	}
	
	