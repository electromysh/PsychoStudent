import React, { useEffect, useState } from 'react';
import { Div, Panel, Title, Text } from '@vkontakte/vkui';
import DonutChart from "react-donut-chart";
import { userData } from '../../data/userData'
import Header from '../../components/Header/Header'

import './End.css';

const End = ({ id }) => {
	const data = [
		{
			label: "Истероидный",
			value: 100,
			color: "#5B00C9"
		},
		{
			label: "Шизоидный",
			value: 65,
			color: "#FEB019"
		},
		{
			label: "Эпилептиоидный",
			value: 100,
			color: "#FF4560"
		},
		{
			label: "Гипертимный",
			value: 15,
			color: "#775DD0"
		},
		{
			label: "Паранойяльный",
			value: 54,
			color: "#21E985",
		},
		{
			label: "Тревожный",
			value: 70,
			color: "#FF0004"
		},
		{
			label: "Эмотивный",
			value: 90,
			color: "#00FFE7"
		}
	];
	const reactDonutChartBackgroundColor = [
		"#5B00C9",
		"#FEB019",
		"#FF4560",
		"#775DD0",
		"#00FFE7",
		"#FF0004",
		"#21E985",
	];
	const reactDonutChartInnerRadius = 0.5;
	const reactDonutChartSelectedOffset = 0.04;
	const reactDonutChartHandleClick = (item, toggled) => { };
	let reactDonutChartStrokeColor = "#FFFFFF";
	const reactDonutChartOnMouseEnter = (item) => {
		let color = data.find((q) => q.label === item.label).color;
		reactDonutChartStrokeColor = color;
	};

	const [user, setUser] = useState(null);
	const mainRadical = data.reduce((acc, curr) => acc.value < curr.value ? curr : acc, data[0]);
	
	useEffect(async () => {
		const user = await userData.getUserBaseInfo();
		setUser(user);
	});
	return (
		<Panel id={id}>
			<Header avatar={user ? user.photo_100 : null} />
			<Div>
				<Title level="1" weight="medium">Результат теста</Title>
			</Div>
			<div className="donut">
				<DonutChart
					width={700}
					height={400}
					onMouseEnter={(item) => reactDonutChartOnMouseEnter(item)}
					strokeColor={reactDonutChartStrokeColor}
					data={data}
					colors={reactDonutChartBackgroundColor}
					innerRadius={reactDonutChartInnerRadius}
					selectedOffset={reactDonutChartSelectedOffset}
					onClick={(item, toggled) => reactDonutChartHandleClick(item, toggled)}
				/>
			</div>
			<Div>
				<Title level="2" weight="medium">У Вас преобладает {mainRadical.label.toLowerCase()} радикал</Title>
				<p>Описание радикала </p>
			</Div>
		</Panel>
	);
};


export default End;
