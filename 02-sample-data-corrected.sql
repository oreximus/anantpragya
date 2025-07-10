-- Sample data for anantpragya database
-- Corrected version with proper UUID uniqueness

-- Insert sample users
INSERT INTO `user` (`id`, `first_name`, `last_name`, `email`, `phone_no`, `password`, `access_token`, `created_at`, `created_by`, `updated_at`, `updated_by`, `is_admin`, `is_active`, `is_deleted`) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'John', 'Doe', 'john.doe@example.com', 9876543210, '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...', '2024-01-15 10:30:00', NULL, '2024-01-15 10:30:00', NULL, 1, 1, 0),
('550e8400-e29b-41d4-a716-446655440002', 'Jane', 'Smith', 'jane.smith@example.com', 9876543211, '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...', '2024-01-16 14:20:00', NULL, '2024-01-16 14:20:00', NULL, 0, 1, 0),
('550e8400-e29b-41d4-a716-446655440003', 'Mike', 'Johnson', 'mike.johnson@example.com', 9876543212, '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, '2024-01-17 09:15:00', NULL, '2024-01-17 09:15:00', NULL, 0, 1, 0),
('550e8400-e29b-41d4-a716-446655440004', 'Sarah', 'Wilson', 'sarah.wilson@example.com', 9876543213, '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...', '2024-01-18 16:45:00', NULL, '2024-01-18 16:45:00', NULL, 0, 1, 0),
('550e8400-e29b-41d4-a716-446655440005', 'David', 'Brown', 'david.brown@example.com', 9876543214, '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, '2024-01-19 11:30:00', NULL, '2024-01-19 11:30:00', NULL, 0, 1, 0);

-- Insert post categories (using unique UUIDs)
INSERT INTO `post_category` (`id`, `name`, `is_active`, `is_deleted`) VALUES
('6b1e8400-e29b-41d4-a716-446655440001', 'Technology', 1, 0),
('6b1e8400-e29b-41d4-a716-446655440002', 'Travel', 1, 0),
('6b1e8400-e29b-41d4-a716-446655440003', 'Food & Cooking', 1, 0),
('6b1e8400-e29b-41d4-a716-446655440004', 'Health & Fitness', 1, 0),
('6b1e8400-e29b-41d4-a716-446655440005', 'Entertainment', 1, 0),
('6b1e8400-e29b-41d4-a716-446655440006', 'Education', 1, 0);

-- Insert sample posts (using unique UUIDs)
INSERT INTO `post` (`id`, `category_id`, `title`, `post_data`, `created_at`, `created_by`, `updated_at`, `updated_by`, `is_active`, `is_deleted`) VALUES
('7c2e8400-e29b-41d4-a716-446655440001', '6b1e8400-e29b-41d4-a716-446655440001', 'The Future of Artificial Intelligence', 'Artificial Intelligence is rapidly transforming our world. From machine learning algorithms to neural networks, AI is becoming an integral part of our daily lives. In this post, we explore the latest developments in AI technology and what the future holds for this exciting field.', '2024-02-01 10:00:00', '550e8400-e29b-41d4-a716-446655440001', '2024-02-01 10:00:00', '550e8400-e29b-41d4-a716-446655440001', 1, 0),
('7c2e8400-e29b-41d4-a716-446655440002', '6b1e8400-e29b-41d4-a716-446655440002', 'Hidden Gems of Southeast Asia', 'Southeast Asia is full of incredible destinations that are often overlooked by tourists. From pristine beaches in the Philippines to ancient temples in Cambodia, this region offers unforgettable experiences for adventurous travelers.', '2024-02-02 15:30:00', '550e8400-e29b-41d4-a716-446655440002', '2024-02-02 15:30:00', '550e8400-e29b-41d4-a716-446655440002', 1, 0),
('7c2e8400-e29b-41d4-a716-446655440003', '6b1e8400-e29b-41d4-a716-446655440003', 'Mastering Italian Pasta: A Beginner\'s Guide', 'Learn the art of making authentic Italian pasta from scratch. This comprehensive guide covers everything from selecting the right flour to perfecting your pasta-making technique. Includes recipes for classic sauces and tips from Italian chefs.', '2024-02-03 12:15:00', '550e8400-e29b-41d4-a716-446655440003', '2024-02-03 12:15:00', '550e8400-e29b-41d4-a716-446655440003', 1, 0),
('7c2e8400-e29b-41d4-a716-446655440004', '6b1e8400-e29b-41d4-a716-446655440004', '10 Minute Morning Workout Routine', 'Start your day right with this quick and effective morning workout routine. No equipment needed! These exercises will boost your energy levels and help you maintain a healthy lifestyle even with a busy schedule.', '2024-02-04 07:45:00', '550e8400-e29b-41d4-a716-446655440004', '2024-02-04 07:45:00', '550e8400-e29b-41d4-a716-446655440004', 1, 0),
('7c2e8400-e29b-41d4-a716-446655440005', '6b1e8400-e29b-41d4-a716-446655440005', 'Top 5 Netflix Series to Binge This Weekend', 'Looking for something to watch this weekend? Here are our top 5 Netflix series recommendations that will keep you glued to your screen. From thrilling dramas to hilarious comedies, there\'s something for everyone.', '2024-02-05 18:20:00', '550e8400-e29b-41d4-a716-446655440005', '2024-02-05 18:20:00', '550e8400-e29b-41d4-a716-446655440005', 1, 0);

-- Insert post comments (using unique UUIDs)
INSERT INTO `post_comment` (`id`, `post_id`, `comment`, `created_at`, `created_by`, `updated_at`, `updated_by`, `is_active`, `is_deleted`) VALUES
('8d3e8400-e29b-41d4-a716-446655440001', '7c2e8400-e29b-41d4-a716-446655440001', 'Great article! AI is indeed the future. Looking forward to more developments.', '2024-02-01 11:30:00', '550e8400-e29b-41d4-a716-446655440002', '2024-02-01 11:30:00', '550e8400-e29b-41d4-a716-446655440002', 1, 0),
('8d3e8400-e29b-41d4-a716-446655440002', '7c2e8400-e29b-41d4-a716-446655440001', 'I work in AI research and this is spot on. Thanks for sharing!', '2024-02-01 14:15:00', '550e8400-e29b-41d4-a716-446655440003', '2024-02-01 14:15:00', '550e8400-e29b-41d4-a716-446655440003', 1, 0),
('8d3e8400-e29b-41d4-a716-446655440003', '7c2e8400-e29b-41d4-a716-446655440002', 'I\'ve been to some of these places! Cambodia is absolutely beautiful.', '2024-02-02 16:45:00', '550e8400-e29b-41d4-a716-446655440004', '2024-02-02 16:45:00', '550e8400-e29b-41d4-a716-446655440004', 1, 0),
('8d3e8400-e29b-41d4-a716-446655440004', '7c2e8400-e29b-41d4-a716-446655440003', 'Tried this recipe last night - amazing! My family loved it.', '2024-02-03 19:30:00', '550e8400-e29b-41d4-a716-446655440005', '2024-02-03 19:30:00', '550e8400-e29b-41d4-a716-446655440005', 1, 0),
('8d3e8400-e29b-41d4-a716-446655440005', '7c2e8400-e29b-41d4-a716-446655440004', 'Perfect for busy mornings! Been doing this routine for a week now.', '2024-02-04 08:20:00', '550e8400-e29b-41d4-a716-446655440001', '2024-02-04 08:20:00', '550e8400-e29b-41d4-a716-446655440001', 1, 0),
('8d3e8400-e29b-41d4-a716-446655440006', '7c2e8400-e29b-41d4-a716-446655440005', 'Just finished watching the first series on your list. Incredible!', '2024-02-05 20:10:00', '550e8400-e29b-41d4-a716-446655440002', '2024-02-05 20:10:00', '550e8400-e29b-41d4-a716-446655440002', 1, 0);

-- Insert post activities (likes) - using unique UUIDs
INSERT INTO `post_activity` (`id`, `post_id`, `is_liked`, `created_at`, `created_by`, `updated_at`, `updated_by`, `is_active`, `is_deleted`) VALUES
('9e4e8400-e29b-41d4-a716-446655440001', '7c2e8400-e29b-41d4-a716-446655440001', 1, '2024-02-01 11:00:00', '550e8400-e29b-41d4-a716-446655440002', '2024-02-01 11:00:00', '550e8400-e29b-41d4-a716-446655440002', 1, 0),
('9e4e8400-e29b-41d4-a716-446655440002', '7c2e8400-e29b-41d4-a716-446655440001', 1, '2024-02-01 13:45:00', '550e8400-e29b-41d4-a716-446655440003', '2024-02-01 13:45:00', '550e8400-e29b-41d4-a716-446655440003', 1, 0),
('9e4e8400-e29b-41d4-a716-446655440003', '7c2e8400-e29b-41d4-a716-446655440001', 1, '2024-02-01 16:20:00', '550e8400-e29b-41d4-a716-446655440004', '2024-02-01 16:20:00', '550e8400-e29b-41d4-a716-446655440004', 1, 0),
('9e4e8400-e29b-41d4-a716-446655440004', '7c2e8400-e29b-41d4-a716-446655440002', 1, '2024-02-02 16:00:00', '550e8400-e29b-41d4-a716-446655440001', '2024-02-02 16:00:00', '550e8400-e29b-41d4-a716-446655440001', 1, 0),
('9e4e8400-e29b-41d4-a716-446655440005', '7c2e8400-e29b-41d4-a716-446655440002', 1, '2024-02-02 17:30:00', '550e8400-e29b-41d4-a716-446655440005', '2024-02-02 17:30:00', '550e8400-e29b-41d4-a716-446655440005', 1, 0),
('9e4e8400-e29b-41d4-a716-446655440006', '7c2e8400-e29b-41d4-a716-446655440003', 1, '2024-02-03 18:15:00', '550e8400-e29b-41d4-a716-446655440002', '2024-02-03 18:15:00', '550e8400-e29b-41d4-a716-446655440002', 1, 0),
('9e4e8400-e29b-41d4-a716-446655440007', '7c2e8400-e29b-41d4-a716-446655440004', 1, '2024-02-04 08:00:00', '550e8400-e29b-41d4-a716-446655440003', '2024-02-04 08:00:00', '550e8400-e29b-41d4-a716-446655440003', 1, 0),
('9e4e8400-e29b-41d4-a716-446655440008', '7c2e8400-e29b-41d4-a716-446655440005', 1, '2024-02-05 19:45:00', '550e8400-e29b-41d4-a716-446655440004', '2024-02-05 19:45:00', '550e8400-e29b-41d4-a716-446655440004', 1, 0);

-- Insert post files (using unique UUIDs)
INSERT INTO `post_file` (`id`, `post_id`, `original_name`, `file_path`, `is_active`, `is_deleted`) VALUES
('af5e8400-e29b-41d4-a716-446655440001', '7c2e8400-e29b-41d4-a716-446655440001', 'ai_infographic.jpg', '/uploads/posts/2024/02/ai_infographic_1706774400.jpg', 1, 0),
('af5e8400-e29b-41d4-a716-446655440002', '7c2e8400-e29b-41d4-a716-446655440002', 'southeast_asia_map.png', '/uploads/posts/2024/02/southeast_asia_map_1706860800.png', 1, 0),
('af5e8400-e29b-41d4-a716-446655440003', '7c2e8400-e29b-41d4-a716-446655440002', 'temple_photo.jpg', '/uploads/posts/2024/02/temple_photo_1706860800.jpg', 1, 0),
('af5e8400-e29b-41d4-a716-446655440004', '7c2e8400-e29b-41d4-a716-446655440003', 'pasta_recipe.pdf', '/uploads/posts/2024/02/pasta_recipe_1706947200.pdf', 1, 0),
('af5e8400-e29b-41d4-a716-446655440005', '7c2e8400-e29b-41d4-a716-446655440003', 'pasta_making_video.mp4', '/uploads/posts/2024/02/pasta_making_video_1706947200.mp4', 1, 0),
('af5e8400-e29b-41d4-a716-446655440006', '7c2e8400-e29b-41d4-a716-446655440004', 'workout_routine.gif', '/uploads/posts/2024/02/workout_routine_1707033600.gif', 1, 0);

-- Insert comment files (using unique UUIDs)
INSERT INTO `comment_file` (`id`, `comment_id`, `original_name`, `file_path`, `is_active`, `is_deleted`) VALUES
('bf6e8400-e29b-41d4-a716-446655440001', '8d3e8400-e29b-41d4-a716-446655440003', 'cambodia_trip_photo.jpg', '/uploads/comments/2024/02/cambodia_trip_photo_1706864700.jpg', 1, 0),
('bf6e8400-e29b-41d4-a716-446655440002', '8d3e8400-e29b-41d4-a716-446655440004', 'my_pasta_result.jpg', '/uploads/comments/2024/02/my_pasta_result_1706973000.jpg', 1, 0),
('bf6e8400-e29b-41d4-a716-446655440003', '8d3e8400-e29b-41d4-a716-446655440005', 'morning_workout_selfie.jpg', '/uploads/comments/2024/02/morning_workout_selfie_1707036000.jpg', 1, 0);

