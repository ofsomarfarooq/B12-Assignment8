import logo from "../assets/load.gif";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube,faXTwitter,faSquareInstagram} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const rickroll = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-900 text-slate-100  ">
      <div className="container-default py-6">
      
        <div className="flex items-center gap-2">
          <a href={rickroll}  target="_blank">
            <img src={logo} alt="My Hero Appamedia" className="h-15 w-15" />
            
          </a>
          <span className="font-extrabold tracking-tight text-lg">
              My Hero Appamedia
            </span>
          </div>
        

        <p className="text-slate-300 mt-2 text-sm">
          We build productive apps for retards.
        </p>

     
        <div className="mt-4 flex items-center gap-3">
       
          <a
            href={rickroll}
            target="_blank"
            
            aria-label="YouTube"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700"
            title="YouTube"
          >
            <FontAwesomeIcon icon={faYoutube} />
          </a>


          <a
            href={rickroll}
            target="_blank"
            rel="noreferrer"
            aria-label="X"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700"
            title="X"
          >
           <FontAwesomeIcon icon={faXTwitter} />
          </a>

          <a
            href={rickroll}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700"
            title="Instagram"
          >
            <FontAwesomeIcon icon={faSquareInstagram} />
          </a>
          <a 
          href={rickroll}
          target="_blank"
          className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 hover:scale-105 transition-all duration-300"
        >
          Do not click me
        </a>
        </div>

        <p className="text-xs text-slate-500 mt-4">
          ©  All rights reserved.
        </p>
      </div>
      
    </footer>
  );
}
