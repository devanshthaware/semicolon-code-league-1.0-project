"use client";

import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import HeroSection from "@/components/hero-section";
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";


export default function Home() {
    const tasks = useQuery(api.tasks.get);

  return (
    <>
       <HeroSection/>
    </>
  );
}
