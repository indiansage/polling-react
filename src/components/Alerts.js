import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { alertActions } from '../actions/alertActions';

const Alerts = () => {
    const alert = useSelector((state) => state.alert);
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        history.listen(() => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, [dispatch, history]);
    //alert.message && console.log('msg', alert.message);
    return (
        <div
            className="columns is-mobile"
            style={{ marginTop: '1rem', minHeight: '4rem' }}
            data-testid="Alerts"
        >
            {alert.message && (
                <div
                    className="column is-offset-3 is-6"
                    style={{ padding: '0' }}
                    data-testid="AlertMsg"
                >
                    <div className={`notification ${alert.type}`}>
                        <button
                            className="delete"
                            data-testid="CloseAlert"
                            onClick={() => {
                                // clear alert
                                dispatch(alertActions.clear());
                            }}
                        />
                        {alert.message}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Alerts;
