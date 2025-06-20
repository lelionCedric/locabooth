// RecommendationSelector.tsx
import React from 'react';
import './recommandation.css';

interface RecommandationProps {
    value: boolean | null;
    onChange: (value: boolean) => void;
    error?: string;
}

export const Recommandation: React.FC<RecommandationProps> = ({
                                                                                  value,
                                                                                  onChange,
                                                                                  error
                                                                              }) => {
    return (
        <div className="recommendation-selector">
            <label className="form-label-form">
                Recommandation *
            </label>
            <div className="recommendation-buttons">
                <button
                    type="button"
                    className={`thumb-button thumb-up ${value === true ? 'thumb-button--active' : ''}`}
                    onClick={() => onChange(true)}
                    aria-label="Je recommande"
                >
                    <span className="thumb-icon">👍</span>
                    <span className="thumb-text">Je recommande</span>
                </button>

                <button
                    type="button"
                    className={`thumb-button thumb-down ${value === false ? 'thumb-button--active' : ''}`}
                    onClick={() => onChange(false)}
                    aria-label="Je ne recommande pas"
                >
                    <span className="thumb-icon">👎</span>
                    <span className="thumb-text">Je ne recommande pas</span>
                </button>
            </div>

            {error && (
                <div className="recommendation-error">
                    {error}
                </div>
            )}
        </div>
    );
};