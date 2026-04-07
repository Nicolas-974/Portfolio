function pgm02_v3(){

    //Initialisation variables
    var texte, L_debut, L_fin, NBcaract, alphab, épeller, renverser, envers, palindrome, result;
    

  //Algorithme à répéter jusqu'à ce que l'on tape Q
  do{

        //On tape et on enregistre la valeur dans notre variable texte
        texte = prompt('Taper un texte svp (Q pour quitter)');

        //Si on a n'a pas tapé Q, réaliser les traitements ci-dessous
        if (texte != 'Q') {

            //On enregiste le nombre de caractères, la 1ere lettre et la dernière lettre de notre variable texte
            NBcaract = texte.length;
            L_debut = texte.substr(0,1);
            L_fin = texte.substr(NBcaract-1,1);

            //Algo du pgm02_v2
            alphab = "";
            
            //Instruction for pour pouvoir épeller notre variable texte
            for (épeller = 0; épeller < NBcaract; épeller++){

                alphab = alphab + ',' + texte.substr(épeller,1);
            }

            //Algo pgm02_v3
            renverser= "";

            //Instruction pour lire à l'envers la variable texte
            for (envers = NBcaract; envers > -1; envers--){

                renverser = renverser + texte.substr(envers,1);
            }


            //Vérification palindrome
            if (texte == renverser){

                palindrome = 'C\'est un VRAI palindrome';

            }

            else{

                palindrome = 'Ce n\'est pas un palindrome';
            }

            //Pour afficher nos résultats
            result = (texte + '\n\n' + 
            '- Ce texte comporte ' + NBcaract + ' caractères \n' + 
            '- première lettre est (' + L_debut + ') \n' + 
            '- dernière lettre est (' + L_fin + ') \n'+
            '- je l\'épelle: ' + alphab.substr(1) +
            '\n -A l\'envers, ça donnerait: ' + renverser +
            '\n' + palindrome);
            
            alert(result);  
        }

        //Si on a tapé Q
        else{ 
            alert('Au revoir');
        }

        

    }
    while (texte != 'Q');
    
  
}


//mettre en minuscule: to LowerCase();
//mettre en majuscule: toUpperCase();