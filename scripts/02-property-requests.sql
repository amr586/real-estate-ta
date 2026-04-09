-- Property Requests Table
CREATE TABLE IF NOT EXISTS property_requests (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    property_type VARCHAR(50) NOT NULL, -- apartment, villa, land, etc
    listing_type VARCHAR(20) NOT NULL, -- sale, rent
    location VARCHAR(255) NOT NULL,
    budget_min DECIMAL(15, 2),
    budget_max DECIMAL(15, 2),
    area_min INTEGER,
    area_max INTEGER,
    bedrooms INTEGER,
    status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected, in-review
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    admin_notes TEXT,
    admin_id INTEGER REFERENCES users(id),
    reviewed_at TIMESTAMP
);

-- Admin Reviews Table
CREATE TABLE IF NOT EXISTS admin_reviews (
    id SERIAL PRIMARY KEY,
    request_id INTEGER NOT NULL REFERENCES property_requests(id) ON DELETE CASCADE,
    admin_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    action VARCHAR(20) NOT NULL, -- approve, reject, request-info
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_property_requests_user_id ON property_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_property_requests_status ON property_requests(status);
CREATE INDEX IF NOT EXISTS idx_property_requests_admin_id ON property_requests(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_reviews_request_id ON admin_reviews(request_id);
