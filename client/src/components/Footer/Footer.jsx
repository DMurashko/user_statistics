import Styles from "./Footer.module.scss";

export default function Footer() {
	return (
		<div className={Styles.bottomContainer}>
			<div className={Styles.bottomTitle}>AppCo</div>
			<div className={Styles.bottomDisclaimer}>All rights reserved by ThemeTags</div>
			<div className={Styles.bottomCopyright}>Copyrights © 2019.</div>
		</div>
	);
}