function Info() {
    return (
        <div className='text-center lg:text-left flex flex-col gap-4'>
            <h1 className='text-3xl text-center'>
                Bienvenue sur O'click !
            </h1>
            <h2 className='text-2xl text-white font-bold'>
                Les règles du jeu :
            </h2>
            <ul className='lg:pl-8 text-xl font-light flex flex-col gap-0.5 text-left'>
                <li>
                    - Cliquez sur un mob pour obtenir de l'Ozeille.
                </li>
                <li>
                    - Achetez et utilisez des spells pour enlever des
                    points de vie à un monstre.
                </li>
                <li>
                    - Avec certains sorts, vous pourrez même amasser
                    plus d'Ozeille par clique.
                </li>
                <li>- Prenez du plaisir.</li>
            </ul>
            <h2 className='text-2xl text-white font-bold'>
                Histoire :
            </h2>
            <ul className='lg:pl-8 text-xl font-light'>
                <li>
                    Des monstres sortis d'un portail datant d'un ère
                    ancien venus pour envaillir le monde. Vous avez
                    été sélectionné pour tous les éradiquer ! Il vous
                    faudra cliquer pendant des centaines d'heures,
                    utiliser des dizaines de sorts pour parvenir à
                    tous les tuer ! Deviendrez-vous le meilleur
                    Cliqueur que le monde ait connu ?
                </li>
            </ul>
            <h2 className='text-2xl text-white font-bold'>
                Sounds Effects :
            </h2>
            <ul className='lg:pl-8 text-xl font-light'>
                <li>
                    - Musique et effets sonores :: Libre de droits
                </li>
            </ul>
            <h2 className='text-2xl text-white font-bold'>
                Créateurs :
            </h2>
            <ul className='lg:pl-8 text-xl font-light flex flex-col gap-0.5'>
                <li>- Sebastien Le Costaud</li>
                <li>- Maxime Le Druide</li>
                <li>- Michael le Diplômate</li>
            </ul>
            <h2 className='text-sm pt-4 text-white font-bold text-center'>
                © O'click 2022-2024
            </h2>
        </div>
    );
}
export default Info;
