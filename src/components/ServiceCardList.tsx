"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Image } from "./Image";

type Props = {
    services: ServiceCard[];
};

export const ServiceCardList: FC<Props> = ({ services }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 max-w-5xl mx-auto"
        >
            {services.map((service, index) => (
                <motion.div
                    key={`${service.title}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 1.3 + index * 0.08 }}
                >
                    <Link
                        href={service.link ?? "#"}
                        className="group relative overflow-hidden rounded-xl aspect-[3/4] block"
                    >
                        <Image
                            image={service.image}
                            alt={service.title}
                            className="w-full h-full"
                            imageClassName="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(min-width: 768px) 20vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                            <h3 className="text-white text-sm md:text-base font-light">
                                {service.title}
                            </h3>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </motion.div>
    );
};


