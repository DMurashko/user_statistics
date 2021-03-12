import Footer from "../Footer/Footer";
import Styles from "./Stats.module.scss";

export default function Stats() {
	return (
		<div className={Styles.stats}>
			<header>AppCo</header>
			<footer>
				<Footer />
			</footer>
		</div>
	);
}