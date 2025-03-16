import { useState } from 'react';
import './calendar.css';
import useReservations from "../../hooks/useReservations.ts";
import ReservationForm from "../demande/DemandeForm.tsx";

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const { reservations } = useReservations(currentDate.getMonth() + 1, currentDate.getFullYear());

    const [selectedDay, setSelectedDay] = useState<number>(0);

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const handlePreviousMonth = () => {
        setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
    };

    const renderDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDayOfMonth = (new Date(year, month, 1).getDay() + 6) % 7; // Adjust so Monday is the first day

        const days = [];

        // Add empty cells for days of the previous month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="empty" />);
        }

        // Add days of the current month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayOfWeek = (firstDayOfMonth + day - 1) % 7; // Calculate day of the week
            const isWeekend = dayOfWeek === 5 || dayOfWeek === 6; // Saturday or Sunday

            const filteredList = isWeekend && reservations?.some((item) => item.date.endsWith(`${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2,'0')}`));

            days.push(
                <div key={day} className="container">
                    <div
                        key={day}
                        className={`calendar-day ${filteredList ? 'calendar-day-not-available' : ''} ${isWeekend ? 'weekend' : 'week'}`}
                        onClick={!filteredList && isWeekend ? () => handleOpenModal(day) : undefined}
                    >
                        {day}
                    </div>
                    {filteredList ? <div key="`${day}`-dispo" className="hovered">Indisponible</div> :
                        <div key="`${day}`-dispo" className="hovered">Disponible</div>}

                </div>
            );
        }

        return days;
    };

    const monthNames = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];

    const dayLabels = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    const dayLabelsAbrege = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

    const currentYear = new Date().getFullYear();
    const nextYears = Array.from({ length: 10 }, (_, i) => currentYear + i);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentDate(prevDate => new Date(Number(event.target.value), prevDate.getMonth()));
    };

    // État pour gérer l'ouverture/fermeture de la modal
    const [isOpen, setIsOpen] = useState(false);

    // Ouvrir la modal
    const handleOpenModal = (day: number) => {
        setSelectedDay(day);
        setIsOpen(true);
        // Désactiver le défilement du body quand la modal est ouverte
        document.body.style.overflow = 'hidden';
    };

    // Fermer la modal
    const handleCloseModal = () => {
        setIsOpen(false);
        // Réactiver le défilement du body
        document.body.style.overflow = 'auto';
    };

    return (
        <>
            <div className="calendar-container">
                <div className="calendar-header">
                    <button onClick={handlePreviousMonth}>&lt;</button>
                    <span>{`${monthNames[currentDate.getMonth()]}`}
                        <select className="year-select" value={currentDate.getFullYear() ?? ""} onChange={handleChange}>

                            {nextYears.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </span>
                    <button onClick={handleNextMonth}>&gt;</button>
                </div>
                <div className="calendar-grid">
                    {dayLabels.map(label => (
                        <div key={label} className="calendar-day-header">{label}</div>
                    ))}
                    {dayLabelsAbrege.map(label => (
                        <div key={label} className="calendar-day-header-mobile">{label}</div>
                    ))}
                    {renderDays()}
                </div>
            </div>
            <ReservationForm annee={currentDate.getFullYear()} mois={monthNames[currentDate.getMonth()]} jour={selectedDay} isOpen={isOpen} handleCloseModal={handleCloseModal} currentDate={currentDate}/>
        </>
    );
};

export default Calendar;
