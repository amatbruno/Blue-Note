import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function Page() {
    return (
        <main>
            <img src="/images/imagen.png" style={{ position: "absolute", width: "100%", height: "100%", zIndex: 1 }} />
            <div style={{ position: "absolute", width: "100%", height: "100%", zIndex: 2, backgroundColor: "white", opacity: "0.7" }}>
                <div style={{ width: "100%", height: "100%", zIndex: 2, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(255, 255, 255, 0.7)" }}>
                    <img src="/images/Logo.png" className="h-2/6 z-3" style={{ position: "relative", zIndex: 3 }} />
                    <div className="absolute flex flex-col items-center bottom-32">
                        <Link href="/auth">
                            <div className="absolute animated-icon cursor-pointer">
                                <FontAwesomeIcon icon={faChevronDown} className="text-black h-12 ml-2" style={{ marginBottom: 0 }} />
                                <FontAwesomeIcon icon={faChevronDown} className="text-black h-16" style={{ marginTop: -42 }} />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
