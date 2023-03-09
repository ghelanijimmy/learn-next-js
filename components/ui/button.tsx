import Link from "next/link";
import styles from "./button.module.css";

type ButtonProps = {
    link?: string,
    children: React.ReactNode
    onClick: () => void
}

export default function Button(props: ButtonProps){
    if(props.link)return <Link className={styles.btn} href={props.link}>{props.children}</Link>
    return <button className={styles.btn} onClick={props.onClick}>{props.children}</button>
}