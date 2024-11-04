import React from "react"
import logo from "../../image/logo.png"
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareGithub } from "react-icons/fa6";

export default function Footer(){
    const copyrightyear = ()=>{
        const year = new Date().getFullYear();
        return year;
    }


    return(
    <>
    <footer className="bg-blue-950">
    <div className="container mx-auto p-0 md:p-8 xl:px-0">
        <div className="mx-auto max-w-7xl px-6 pb-10 pt-16">
            <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                <div className="space-y-4">
                    <div>
                        <a href="/">
                            <div className="flex items-center space-x-2 text-2xl font-medium">
                                <span>
                                    <img src={logo} alt="Logo" className="w-3/4 rounded-lg"/>
                                </span>
                               
                            </div>

                        </a>
                    </div>
                    <div className="max-w-md pr-16 text-md text-gray-200">At REBBELLION PERFUMES, we believe that beauty and fragrance should be accessible to everyone. Our online store offers a carefully curated selection of premium perfumes and high-quality makeup products, ensuring that you find exactly what you need to enhance your beauty routine.
                    </div>
                    <div className="flex space-x-2">
                        <a href="https://www.linkedin.com/in/aymane-miftah-4867aa2b6/" target="_blank" className="text-gray-200 hover:text-gray-200">
                            <span className="sr-only">Linkedin</span>
                            <FaLinkedin className="h-8 w-8"/>
                        </a>
                        <a href="https://web.facebook.com/ayman.gb.92505" target="_blank" className="text-gray-200 hover:text-gray-200">
                            <span className="sr-only">FaceBook</span>
                            <FaFacebookSquare className="h-8 w-8"/>
                        </a>
                        <a href="https://www.instagram.com/_aymane_m/" target="_blank" className="text-gray-200 hover:text-gray-200">
                            <span className="sr-only">Instgram</span>
                            <FaSquareInstagram className="h-8 w-8"/>
                        </a>
                        <a href="https://github.com/aymanemiftah" target="_blank" className="text-gray-200 hover:text-gray-200">
                            <span className="sr-only">Git</span>
                            <FaSquareGithub className="h-8 w-8"/>
                        </a>
                    </div>
                </div>
                <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                    <div className="md:grid md:grid-cols-2 md:gap-8">
                        <div>
                            <h3 className="text-md font-semibold leading-6 text-white">Our Solutions</h3>
                            <ul role="list" className="mt-6 space-y-4">
                                <li>
                                    <a href="https://web.facebook.com/ayman.gb.92505"
                                        className="text-md leading-6 text-gray-300 hover:text-gray-50">FaceBook
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/_aymane_m/"
                                        className="text-md leading-6 text-gray-300 hover:text-gray-50">Instagram
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.linkedin.com/in/aymane-miftah-4867aa2b6/"
                                        className="text-md leading-6 text-gray-300 hover:text-gray-50">Linkdin
                                        
                                    </a>
                                </li>
                                
                            </ul>
                        </div>
                        <div className="mt-10 md:mt-0">
                            <h3 className="text-md font-semibold leading-6 text-white">Your opinions</h3>
                            <ul role="list" className="mt-6 space-y-4">
                                <li>
                                    <a href="/Opinion/Reports"
                                        className="text-md leading-6 text-gray-300 hover:text-gray-50">
                                        Reports
                                    </a>
                                </li>
                               
                            </ul>
                        </div>
                    </div>
                    <div className="md:grid md:grid-cols-2 md:gap-8">
                        <div>
                            <h3 className="text-md font-semibold leading-6 text-white">Our Products</h3>
                            <ul role="list" className="mt-6 space-y-4">
                                <li>
                                    <a href={`/Products/Perfumes?search=${'Parfum'}`}
                                        className="text-md leading-6 text-gray-300 hover:text-gray-50">Perfumes
                                    </a>
                                </li>
                                <li>
                                    <a href={`/Products/Makeup?search=${'Make_up'}`} className="text-md leading-6 text-gray-300 hover:text-gray-50">Make up
                                    </a>
                                </li>
                                <li>
                                    <a href={`/Products/Hors&Body?search=${'Hors_Body'}`}
                                        className="text-md leading-6 text-gray-300 hover:text-gray-50">Horses & Body
                                    </a>
                                </li>
                                <li>
                                    <a href={`/Products/FacialTraitment?search=${'Facial_treatment'}`} className="text-md leading-6 text-gray-300 hover:text-gray-50">Facial Treatment
                                        
                                    </a>
                                </li>
                              
                            </ul>
                        </div>
                        <div className="mt-10 md:mt-0">
                            <h3 className="text-md font-semibold leading-6 text-white">Company</h3>
                            <ul role="list" className="mt-6 space-y-4">
                                <li>
                                    <a href="/Company/About-Us"
                                        className="text-md leading-6 text-gray-300 hover:text-gray-50">About Us
                                    </a>
                                </li>
                                
                                <li>
                                    <a href="/Company/Contact-Us"
                                        className="text-md leading-6 text-gray-300 hover:text-gray-50">Contact Us
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-16 border-t border-gray-400/30 pt-8 sm:mt-20 lg:mt-24">
                <div className="text-md text-center text-white">
                <p>Copyright © <span>{copyrightyear()}</span>. Crafted with ♥ AYMANE</p>
                    
                </div>
            </div>
        </div>
    </div>
</footer>
    </>
    )
}