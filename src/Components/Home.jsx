import React from 'react';
import { Link } from 'react-router-dom';
import { PencilLine, Search } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex flex-col justify-center items-center w-full min-h-screen px-4 text-center gap-6">
            <h1 className="handwritten text-4xl md:text-6xl max-w-[90%] md:max-w-3xl">
                a collection of unspoken words, conveyed through the song
            </h1>
            <p className="text-zinc-500 text-base md:text-lg">
                Express your untold note through the song.
            </p>
            <div className="flex flex-col md:flex-row gap-4 w-full max-w-md md:max-w-none justify-center items-center">
                <Link
                    to="/create"
                    className="bg-zinc-900 text-zinc-50 px-6 h-12 cursor-pointer font-medium rounded-md shadow-sm flex items-center justify-center gap-2 w-full md:w-auto"
                >
                    Write your feelings <PencilLine size={20} />
                </Link>
                <Link
                    to="/browse"
                    className="border border-zinc-300 px-6 h-12 cursor-pointer font-medium rounded-md shadow-sm flex items-center justify-center gap-2 w-full md:w-auto"
                >
                    Browse Notes <Search size={20} />
                </Link>
            </div>
            <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl mt-16">
                {[
                    {
                        title: "Share Your Notes",
                        description:
                            "Choose a song and write a heartfelt note to someone special or save it as a little gift for yourself.",
                    },
                    {
                        title: "Browse Notes",
                        description:
                            "Find notes that were written for you. Search your name and uncover heartfelt notes written just for you.",
                    },
                    {
                        title: "Detail Notes",
                        description:
                            "Tap on any note card to discover the full story behind it and listen to the song that captures the emotion of the moment!",
                    },
                ].map((card, index) => (
                    <div
                        key={index}
                        className="flex flex-col gap-2 border border-zinc-300 bg-white rounded-md p-6 text-left w-full hover:border-zinc-400 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                    >
                        <h1 className="handwritten text-2xl">{card.title}</h1>
                        <p className="text-sm text-zinc-500">{card.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
