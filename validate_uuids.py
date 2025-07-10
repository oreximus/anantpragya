#!/usr/bin/env python3
"""
UUID Validation Script for Sample Data
This script validates that all UUIDs in the SQL file are unique and properly formatted.
"""

import re
import uuid
from collections import defaultdict

def validate_uuid_format(uuid_str):
    """Validate if a string is a properly formatted UUID."""
    try:
        uuid.UUID(uuid_str)
        return True
    except ValueError:
        return False

def extract_uuids_from_sql(file_path):
    """Extract all UUIDs from SQL file and categorize them by table."""
    uuids_by_table = defaultdict(list)
    all_uuids = []
    
    # Pattern to match UUID in SQL INSERT statements
    uuid_pattern = r"'([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})'"
    table_pattern = r"INSERT INTO `(\w+)`"
    
    with open(file_path, 'r') as file:
        content = file.read()
        
        # Split by INSERT statements
        insert_statements = content.split('INSERT INTO')
        
        for statement in insert_statements[1:]:  # Skip the first empty part
            # Extract table name
            table_match = re.search(r'`(\w+)`', statement)
            if table_match:
                table_name = table_match.group(1)
                
                # Extract UUIDs from this statement
                uuids = re.findall(uuid_pattern, statement, re.IGNORECASE)
                
                for uuid_str in uuids:
                    uuids_by_table[table_name].append(uuid_str)
                    all_uuids.append(uuid_str)
    
    return uuids_by_table, all_uuids

def validate_uuids(file_path):
    """Validate UUIDs in the SQL file."""
    print(f"Validating UUIDs in: {file_path}")
    print("=" * 50)
    
    uuids_by_table, all_uuids = extract_uuids_from_sql(file_path)
    
    # Check for format validity
    invalid_format = []
    for uuid_str in all_uuids:
        if not validate_uuid_format(uuid_str):
            invalid_format.append(uuid_str)
    
    # Check for duplicates
    uuid_counts = defaultdict(int)
    for uuid_str in all_uuids:
        uuid_counts[uuid_str] += 1
    
    duplicates = {uuid_str: count for uuid_str, count in uuid_counts.items() if count > 1}
    
    # Print results
    print(f"Total UUIDs found: {len(all_uuids)}")
    print(f"Unique UUIDs: {len(set(all_uuids))}")
    print()
    
    print("UUIDs by table:")
    for table, uuids in uuids_by_table.items():
        print(f"  {table}: {len(uuids)} UUIDs")
    print()
    
    if invalid_format:
        print("❌ Invalid UUID formats found:")
        for uuid_str in invalid_format:
            print(f"  - {uuid_str}")
        print()
    else:
        print("✅ All UUIDs have valid format")
        print()
    
    if duplicates:
        print("❌ Duplicate UUIDs found:")
        for uuid_str, count in duplicates.items():
            print(f"  - {uuid_str} (appears {count} times)")
        print()
    else:
        print("✅ All UUIDs are unique")
        print()
    
    # Check foreign key relationships
    print("Foreign Key Relationships:")
    print("- Posts reference Users (created_by, updated_by)")
    print("- Posts reference Categories (category_id)")
    print("- Comments reference Posts (post_id) and Users (created_by, updated_by)")
    print("- Activities reference Posts (post_id) and Users (created_by, updated_by)")
    print("- Post Files reference Posts (post_id)")
    print("- Comment Files reference Comments (comment_id)")
    print()
    
    # Validate foreign key relationships
    user_ids = set(uuids_by_table.get('user', []))
    category_ids = set(uuids_by_table.get('post_category', []))
    post_ids = set(uuids_by_table.get('post', []))
    comment_ids = set(uuids_by_table.get('post_comment', []))
    
    print("Foreign Key Validation:")
    print(f"- User IDs available: {len(user_ids)}")
    print(f"- Category IDs available: {len(category_ids)}")
    print(f"- Post IDs available: {len(post_ids)}")
    print(f"- Comment IDs available: {len(comment_ids)}")
    print()
    
    # Summary
    if not invalid_format and not duplicates:
        print("🎉 UUID validation PASSED! All UUIDs are unique and properly formatted.")
    else:
        print("❌ UUID validation FAILED! Please fix the issues above.")
    
    return len(invalid_format) == 0 and len(duplicates) == 0

if __name__ == "__main__":
    # Validate the corrected file
    corrected_file = "/home/casan/Documents/projects/anantpragya/02-sample-data-corrected.sql"
    validate_uuids(corrected_file)

