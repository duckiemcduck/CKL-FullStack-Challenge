const msg= 
[
    "Dispatching truth bombs",
    "Unveiling the Illuminatti",
    "Wiretapping the pope",
    "Aligning satellite network",
    "Assembling tin-foil headgear",
    "Wrangling reptilian jammers"
]

function getRandomText()
{
    return msg[Math.floor((Math.random() * msg.length))]
}

export default function randomMessage(state)
{
     switch(state)
            {
                case 'loading': return  " "; break;
                case 'loaded': return   " "; break;
                case 'failed': return (getRandomText() + '...'); break;
                default: return  "wew";
            }
}