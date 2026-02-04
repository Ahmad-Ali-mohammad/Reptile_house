
import React from 'react';
import PolicyPage from '../components/PolicyPage';

const ShippingPolicyPage: React.FC = () => {
    return (
        <PolicyPage title="سياسة الشحن">
            <h2>خيارات الشحن</h2>
            <p>نحن نقدم خدمات الشحن داخل دمشق وجميع المحافظات السورية. يتم التعامل مع جميع شحنات الحيوانات الحية بعناية فائقة لضمان سلامتها ووصولها بحالة ممتازة.</p>
            <ul>
                <li><strong>الشحن داخل دمشق:</strong> يتم التوصيل خلال 24-48 ساعة.</li>
                <li><strong>الشحن للمحافظات:</strong> يتم التوصيل خلال 2-4 أيام عمل.</li>
            </ul>
            <h2>تكاليف الشحن</h2>
            <p>تعتمد تكلفة الشحن على الموقع ونوع الزاحف. سيتم عرض التكلفة النهائية عند إتمام الطلب.</p>
        </PolicyPage>
    );
};

export default ShippingPolicyPage;
