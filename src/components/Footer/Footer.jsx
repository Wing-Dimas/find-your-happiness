import { IconBrandGithub } from "@tabler/icons-react";
import React from "react";

export default function Footer() {
  return (
    <footer className="text-center absolute bottom-3">
      <p className="text-base font-normal">
        Created by{" "}
        <span className="text-primary-blue">Dimas Wing Bagas Bimantara</span>{" "}
        With <span className="text-red-500">❤</span>
      </p>
      <p className="text-base font-normal flex justify-center gap-3">
        Support me
        <a
          href="https://github.com/Wing-Dimas"
          target="_blank"
          className="inline"
        >
          <IconBrandGithub />
        </a>
      </p>
    </footer>
  );
}
