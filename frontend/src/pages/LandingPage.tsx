import { Spotlight } from "../ui/spotLight";
import { useNavigate } from "react-router-dom";

export function SpotlightPreview() {
    const navigate = useNavigate();
    return (
        <div className="h-[40rem] w-full flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
            
            <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
                <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                    Expresser <br /> the companion
                </h1>
                <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
                    Join us on a journey of self-discovery and healing, where every voice finds comfort and every story inspires hope, at Expresser the Companion, your guide to mental health and well-being.
                </p>
                <div className="mt-8 flex justify-center">
                    <button 
                        onClick={() => { navigate('/signup') }}
                        className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                            Start Reading 
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
