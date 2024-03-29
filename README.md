# VisualDonProjetJoraneMembrez

Thématique

Contexte :

Les données viennent du site web kaggle.com. Elles ont été créée par Marília Prata. Il y a que très peu d’informations concernant la raison de leur conception et la raison pour lesquelles celles-ci ont été enregistrées. Cependant, contrairement à des explications claires concernant la publication de ces chiffres, il nous explique le concept de "Pro Ana. Mon amie Mia", il s'agit d'une communauté qui a été créé en prônant les troubles du comportement alimentaire comme mode de vie. Il explique également qu’à cause de l’accessibilité facilité à internet, les jeunes l’ont de plus en plus utiliser afin de publier des contenus poussant à l'idéalisation d'un mode de vie comportant les troubles du comportement alimentaire (TCA). Il peut donc s'agir d'une raison pour lesquelles la personne aurait souhaité récolté ces informations, afin d'affirmer l'expansion des TCA suite à l'accès à Internet de plus en plus rependu.

Description :

Les données sont structurées de manière plutôt simple, nous avons le pays, l’année et le nombre de personnes atteintes d’anorexie et de boulimie. Il y a premièrement pour le nom du pays un format « string », concernant l'année il s'agit d'une information sous le format "int", le nombre de cas de boulimie et d’anorexie est également sous le même format. Les données sont sous format ".csv".

But :

J’ai choisis de traiter de l’anorexie et de la boulimie, deux maladies mentales très dévastatrice. En effet, en Suisse elle touche pour l’anorexie 1.2% des femmes et 0.2% des hommes, concernant la boulimie elle touche 2.4% des femmes et 0.9% des hommes selon l’OFSP.
J’aimerais ainsi pouvoir retracer s’il s’agit tout d’abord de maladies mentales qui se sont de développé avec la ou s’il s’agit d’une maladie qui a toujours existé mais dont on ne parle peu. Un autre but est de montrer l’importance de ces maladies des fois très peu prise en compte et peu comprises par l’entourage des personnes souffrantes.
De plus, une partie qui pourrait être intéressante est de pouvoir visualiser dans quel pays ces maladies sont le plus développé en comparant les pays pauvres et les pays riches par exemple.
Je souhaiterais mélanger l’exploration et l’explication, si cela est réalisable je souhaiterais créer une map ou les personnes pourraient cliquer et diverses informations concernant les troubles s’afficheraient. Cependant, je souhaiterais quand même exposer des graphiques avec explication concernant les données les plus intéressantes.

Vous trouverez l'accès aux données sous le lien suivant : https://www.kaggle.com/datasets/mpwolke/cusersmarildownloadsanamiacsv

Références :

Les données ont déjà utilisé dans un site web, vous trouverez les informations sur le lien suivant : : https://ourworldindata.org/grapher/number-with-anorexia-and-bulimia-nervosa?country=~OWID_WRL, il s’agit uniquement d’un graphique recensant l’évolution des cas d’anorexie et de boulimie dans le monde. D’autre part, je n’ai pas trouvé un autre site web utilisant déjà ces données ni proposant de graphique sur les TCA.

Wireframe :

Lorsque les personnes arrivent sur le site, ils peuvent out d’abord apercevoir le titre en blanc : « L’anorexie et la boulimie dans le monde ». Il y a également deux carrés indiquant « Anorexie » et « Boulimie », ainsi qu’un graphique résumant le nombre de personnes boulimiques et anorexiques dans le monde de 1996 à 2019, elles peuvent déplacer le curseur sur les années afin d’avoir par exemple uniquement de 2017 à 2019, les personnes peuvent cliquer sur anorexie ou boulimie afin d’avoir plus d’informations sur le trouble. (wireframe 1 – 2 )
Le fond de toutes mes pages sera comme ceci : images disponible sous : images/page de fond.png

Il y a une barre de scroll, ainsi si les personnes scrollent, elles arrivent sur une deuxième page où se trouve une carte de monde en entier sous forme de rond avec les points en bleu foncé pour indiquer tous les pays (j’hésite encore à mettre à ce moment-là des boutons uniquement pour certains endroits et après quand les personnes cliquent, il y a les boutons de tous les pays qui s’affichent). Les boutons clignotent avec une sorte de lumière qui sorte de l’intérieur, ainsi le bouton ressemblerait à cela, le blanc s’intensifierait afin de créer une sorte de clignotant.

Boutons sous : iamges/boutonPays.png

Il y aura un d’aula de lumière autour de la terre. Il y aura également un aula de lumière en dessous de la terre pour permettre d’avoir un univers un peu plus immersif.

Aula de lumière sous : iamges/aula de lumière.png

Les personnes peuvent utiliser la flèche à disposition pour tourner autour de la terre, à ce moment-là aucune information de plus est présente. (J’hésite encore à garder cette flèche , je me demande si elle est utile) (wireframe 3)
Dès le moment ou une personne cliquent sur un bouton il se trouve zoomé sur la carte près avec plusieurs pays qu’il peut voir. (wireframe 4)

Du moment qu'il clique sur un bouton d’un pays précis des informations sur celui-ci sont données, notamment le nombre de personnes en 2019, ainsi que l’évolution du nombre de personnes atteintes par ces troubles de 1996 à 2019. Le pays donnant les informations est automatiquement changé de couleur (wireframe 5). Pour quitter les informations nous avons cas cliqué sur la croix et nous revenons au wireframe 4.

Ensuite la personne peut encore scroller et là elle atteint la page où elle peut observer les pays les plus touchés par ces troubles avec différentes couleurs (wireframe 6).
