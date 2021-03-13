import Footer from "../Footer/Footer";
import Styles from "./Stats.module.scss";
import { useSelector } from 'react-redux';
import { Pagination } from 'antd';
import PageStyles from "./custom.vendor.scss";

export default function Stats() {
	const offset = useSelector(state => state.offset);
	const currentPageElements = useSelector(state => state.currentPageElements);
	const elementsPerPage = useSelector(state => state.elementsPerPage);
	const pagesCount = useSelector(state => state.pagesCount);
	const allElements = useSelector(state => state.allElements);
	const totalElementsCount = useSelector(state => state.totalElementsCount);
	
	return (
		<div className={Styles.stats}>
			<header>AppCo</header>
			<Pagination 
				defaultCurrent={1}
				total={120}
				//showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
				//pageSize={20}
				showSizeChanger={false}
				className={Styles.pages}
			/>
			<footer>
				<Footer />
			</footer>
		</div>
	);
}