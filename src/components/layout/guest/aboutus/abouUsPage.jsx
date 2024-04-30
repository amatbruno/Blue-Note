import NavBar from '@/components/ui/nav-bar';

export default async function AboutUs() {
    let color = "naranja"
    return (
        <main className="w-full overflow-x-hidden">
            <NavBar color={color} />
            <div className='parallax1'>
           </div>
            <br />
            <hr className='divisor_paralax1' />
            <div className='aboutus_text'>
                <br />
                <p>
                    <i className='aboutus_startext_letter'>M</i>as Gospel s’inicia l’any 2012 de manera amateur, així mateix, han participat a d’altres esdeveniments i tallers fora d’Espanya amb artistes de renom com Donald Lawrence, Lurine Cato, Bazil
                    Meade o Kirk Franklin. De fet, l’assistència d’un grup de components de MG l’any 2018 al Festival
                    Internacional “True Worship Summit” de Londres va suposar un abans i un després en la trajectòria del
                    grup.
                </p>
                <br />
                <p>
                    <i className='aboutus_startext_letter'>T</i>res anys més tard s’incorpora al
                    grup el músic Albert Vidal com a director del cor i de la seva mà, els membres de MG han tingut
                    l’oportunitat de participar a workshops impartits per artistes internacionals, assistint a esdeveniments
                    organitzats a Catalunya pel destacat músic Ramon Escalé.
                </p>
                <br />
                <p>
                    <i className='aboutus_startext_letter'>L</i>a passió del grup pel gènere afroamericà es tradueix en un recorregut de creixement imparable
                    que culmina, la primavera de 2019, amb la presentació de l’espectacle Moving Forward.
                </p>
                <br />
                <p>
                    <i className='aboutus_startext_letter'>D</i>es de novembre de 2019, la Direcció Musical de Mas Gospel està a càrrec de Gerson Gelabert, que posseeix una àmplia trajectòria com a músic, arranjador, compositor, cantant i docent, de la seva má, el grup coral inicia un nou recorregut que es reforça i supera davant les adversitats que per la pandèmia afecten, durant l’any 2020, també al món de la música i la cultura.
                </p>
                <br />
                <p>
                    <i className='aboutus_startext_letter'>N</i>ous temes, nous projectes, i el ferm propòsit d’acostar-se de nou a les persones transmetent el millor de l’essència del grup, empenyen a Mas Gospel a crear l’espectacle, “Let’s Feel Better”.
                </p>
                <br />
                <p>
                    <i className='aboutus_startext_letter'>A</i>ctualment, el grup està immers en un nou projecte: “Let Revival Come”, un espectacle que porta als
                    escenaris tota la potència del gòspel contemporani afroamericà, i que inclou temes de creació original
                    del seu director.
                </p>
            </div>
        </main>
    )
}
