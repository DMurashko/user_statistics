import Styles from "./Main.module.scss";
import mobile from '../../images/mobile.svg';
import group1 from "../../images/Group 1.svg";
import group2 from "../../images/Group 2.svg";
import group3 from "../../images/Group 3.svg";
import Footer from "../Footer/Footer";

export default function Main() {
	return (
		<div className={Styles.Main}>
			<header>
				<div className={Styles.picture}><img src={mobile} alt="Mobile app" /></div>
				<div className={Styles.title}>AppCo</div>
				<div className={Styles.slogan}>
					<b>Brainstorming</b> for desired perfect Usability
				</div>
				<div className={Styles.description}>Our design projects are fresh and simple and will benefit your business greatly. Learn more about our work!</div>
				<div className={Styles.button}>
					<div className={Styles.content}>Views Stats</div>
				</div>
			</header>

			<div className={Styles.centeredContainer}>
				<div className={Styles.question}>Why <b>small business owners love</b> AppCo?</div>
				<div className={Styles.secondDescription}>Our design projects are fresh and simple and will benefit your business greatly. Learn more about our work!</div>
				<div className={Styles.propertiesContainer}>

					<div className={Styles.property}>
						<div className={Styles.propertyInnerContainer}>
							<div className={Styles.propertyPicture}>
								<img src={group1} alt="Clean Design" />
							</div>
							<div className={Styles.propertyTitle}>
								Clean Design
							</div>
							<div className={Styles.propertyDescription}>
								Increase sales by showing true dynamics of your website.
							</div>
						</div>
					</div>

					<div className={Styles.property}>
						<div className={Styles.propertyInnerContainer}>
							<div className={Styles.propertyPicture}>
								<img src={group2} alt="Secure Data" />
							</div>
							<div className={Styles.propertyTitle}>
								Secure Data
							</div>
							<div className={Styles.propertyDescription}>
								Build your online store’s trust using Social Proof & Urgency.
							</div>
						</div>
					</div>

					<div className={Styles.property}>
						<div className={Styles.propertyInnerContainer}>
							<div className={Styles.propertyPicture}>
								<img src={group3} alt="Retina Ready" />
							</div>
							<div className={Styles.propertyTitle}>
								Retina Ready
							</div>
							<div className={Styles.propertyDescription}>
								Realize importance of social proof in customer’s purchase decision.
							</div>
						</div>
					</div>

				</div>
			</div>

			<footer>
				<div className={Styles.searchBarContainer}>
					<div className={Styles.searchBar}>
						<input 
							type="email" 
							id="email" 
							name="email" 
							placeholder='Enter your email'
						/>
						<button>
							<div>Subscribe</div>
						</button>
					</div>
				</div>
				<Footer />
			</footer>
		</div>
	);
}